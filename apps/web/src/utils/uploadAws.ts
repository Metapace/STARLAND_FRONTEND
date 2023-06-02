const albumBucketName = 'starlands3';
const bucketRegion = 'ap-southeast-1';
const accessKeyId = 'AKIA55KD7FHZW22GYPEQ';
const secretAccessKey = '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';

const uploadAws = async (file: File, getProgress?: (percent: number) => void) => {
  import('aws-sdk').then(async (AWS) => {
    const s3 = new AWS.S3({
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
      region: bucketRegion,
    });
    const suffix = `${Date.now()}-${file.name}`;
    const uploadParams = {
      Bucket: albumBucketName,
      Body: file,
      Key: `starland/${suffix}`,
    };
    const manageUpload = s3.upload(uploadParams);
    manageUpload.on('httpUploadProgress', (res) => {
      if (getProgress) {
        getProgress((res.loaded * 100) / res.total);
      }
    });
    const res = await manageUpload.promise();
    return res;
  });
};

export default uploadAws;
