# Welcome to SF Einstein!

Javascript library for consuming Salesforce Einstein API as per [Documentation](https://metamind.readme.io/docs)

# Getting Started

## Setup

    var sfEinstein = require('sf-einstein');
    
    sfEinstein.setup({
        baseUrl :  'https://api.einstein.ai',
        accountId :  <your_account_id>,
        privateKey :  <your_private_key>
    });

## Get Token - [Documentation](https://metamind.readme.io/docs/generate-an-oauth-access-token)

Generates a new token based on the details set in the **Setup** step

    sfEinstein.getToken().then((token) => {
        console.log(token);
    });
    
# Datasets

## Create a Dataset - [Documentation](https://metamind.readme.io/docs/create-a-dataset-zip-async)
Asynchronously creates a dataset based either on an URL or a .zip file


### Create a Dataset from URL


    sfEinstein.createDatasetFromUrl('My Dataset', 'image', 'https://www.path.to/my_file.zip')
    .then((response) => {
        console.log(response.id);
    });

### Create a Dataset from .zip file
    var fs = require('fs');
    
    var myDatasetFile = fs.createReadStream('/foo/dataset.zip');
    sfEinstein.createDatasetFromZipFile('My Dataset', 'image', myDatasetFile)
    .then((response) => {
        console.log(response.id);
    });
    

## Get all Datasets - [Documentation](https://metamind.readme.io/docs/get-all-datasets)

Retrieves all Datasets created for current account

    sfEinstein.getDatasets()
    .then((response) => {
        var datasets = response.data;
        datasets.forEach(dataset => console.log(dataset.name));
    });

## Get a Dataset - [Documentation](https://metamind.readme.io/docs/get-a-dataset)

Retrieves a specific Dataset

    sfEinstein.getDataset('123456')
    .then((dataset) => {
        console.log(dataset.name);
    });

## Delete a Dataset - [Documentation](https://metamind.readme.io/docs/delete-a-dataset)

Deletes a specific Dataset

    sfEinstein.deleteDataset('123456')
    .then((deletion) => {
        console.log(deletion.id);
    });

## Get Deletion Status - [Documentation](https://metamind.readme.io/docs/get-vision-deletion-status)

Retrieves status of a Dataset deletion

    sfEinstein.getDatasetDeletionStatus('Z2JTFBF3A7XKIJC5QEJXMO4HSY')
    .then((deletion) => {
        console.log(deletion.status);
    });

# Training

## Get Training Status - [Documentation](https://metamind.readme.io/docs/get-training-status)
Returns the status of a model's training process

    sfEinstein.getTrainingStatus('X6FKINOA2K33JSCN63RO6J3SQM')
    .then((training) => {
        console.log(training.status);
    });

## Train a Dataset - [Documentation](https://metamind.readme.io/docs/train-a-dataset)

Trains a dataset and creates a model

    sfEinstein.trainDataset('Name', '123456')
    .then((training) => {
        console.log(training.modelId);
    });


## Retrain a Dataset - [Documentation](https://metamind.readme.io/docs/retrain-a-dataset)

Retrains a dataset and updates a model

    sfEinstein.trainDataset('7JXCXTRXTMNLJCEF2DR5CJ46QU')
    .then((training) => {
        console.log(training.status);
    });

# Predictions
## Predict by URL - [Documentation](https://metamind.readme.io/docs/prediction-with-image-url)

Retrieves a prediction from a model for the image on the url passed

    sfEinstein.predictByUrl('123456', 'https://www.path.to/image.jpg')
    .then((prediction) => {
        prediction.probabilities.forEach((prob) => {
            console.log(prob.label + ' : ' + prob.probability);
        });
    });

## Predict by Base64 String - [Documentation](https://metamind.readme.io/docs/prediction-with-image-base64-string)

Retrieves a prediction from a model for the image decoded into Base64 String

    sfEinstein.predictByImageBase64('123456', 'data:image/jpeg;base64,/9j/4RiDRXhpZgAATU0AKgA')
    .then((prediction) => {
        prediction.probabilities.forEach((prob) => {
            console.log(prob.label + ' : ' + prob.probability);
        });
    });

## Predict by Image File - [Documentation](https://metamind.readme.io/docs/prediction-with-image-file)

Retrieves a prediction from a model for the image file

    var fs = require('fs');
    
    var myImage = fs.createReadStream('/foo/bar.jpg');
    sfEinstein.predictByImageBase64('123456', myImage)
    .then((prediction) => {
        prediction.probabilities.forEach((prob) => {
            console.log(prob.label + ' : ' + prob.probability);
        });
    });
