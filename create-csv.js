const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// Read JSON data from a file
const jsonData = JSON.parse(fs.readFileSync('data.json', 'utf-8'));

const csvWriter = createCsvWriter({
  path: 'output.csv',
  header: [
    { id: 'ProductURL', title: 'ProductURL' },
    { id: 'ID', title: 'ID' },
    { id: 'CreatedAt', title: 'CreatedAt' },
    { id: 'UpdatedAt', title: 'UpdatedAt' },
    { id: 'BusinessUnitId', title: 'BusinessUnitId' },
    { id: 'Stars', title: 'Stars' },
    { id: 'Content', title: 'Content' },
    { id: 'ProductID', title: 'ProductID' },
    { id: 'ProductName', title: 'ProductName' },
    { id: 'ProductSKU', title: 'ProductSKU' },
    { id: 'ProductBrand', title: 'ProductBrand' },
    { id: 'ConsumerID', title: 'ConsumerID' },
    { id: 'ConsumerEmail', title: 'ConsumerEmail' },
    { id: 'ConsumerName', title: 'ConsumerName' },
    { id: 'ReferenceID', title: 'ReferenceID' },
    { id: 'Locale', title: 'Locale' },
    { id: 'Language', title: 'Language' },
    { id: 'RedirectURI', title: 'RedirectURI' },
    { id: 'State', title: 'State' },
    { id: 'HasModerationHistory', title: 'HasModerationHistory' }
  ]
});

const records = {};

jsonData.productReviews.forEach((review) => {
  const productUrl = review.product && review.product.productUrl; // Check if productUrl exists
  if (productUrl) {
    const record = {
      ProductURL: productUrl,
      ID: review.id || '',
      CreatedAt: review.createdAt || '',
      UpdatedAt: review.updatedAt || '',
      BusinessUnitId: review.businessUnitId || '',
      Stars: review.stars || '',
      Content: review.content || '',
      ProductID: review.product.id || '',
      ProductName: review.product.name || '',
      ProductSKU: review.product.sku || '',
      ProductBrand: review.product.brand || '',
      ConsumerID: review.consumer.id || '',
      ConsumerEmail: review.consumer.email || '',
      ConsumerName: review.consumer.name || '',
      ReferenceID: review.referenceId || '',
      Locale: review.locale || '',
      Language: review.language || '',
      RedirectURI: review.redirectUri || '',
      State: review.state || '',
      HasModerationHistory: review.hasModerationHistory || ''
    };
    if (!records[productUrl]) {
      records[productUrl] = record;
    } else {
      for (const key in record) {
        if (key !== 'ProductURL') {
          records[productUrl][key] += `|${record[key]}`;
        }
      }
    }
  }
});

const finalRecords = Object.values(records);

csvWriter.writeRecords(finalRecords).then(() => {
  console.log('CSV file "output.csv" has been created.');
});
