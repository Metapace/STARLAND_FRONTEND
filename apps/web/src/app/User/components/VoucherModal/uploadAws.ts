import AWS from 'aws-sdk';
const albumBucketName = 'starlands3';
const bucketRegion = 'ap-southeast-1';
const accessKeyId = 'AKIA55KD7FHZW22GYPEQ';
const secretAccessKey = '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';

const s3 = new AWS.S3({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  region: bucketRegion,
});

const uploadAws = async (file: any) => {
  const suffix = `${file.name}`;
  const uploadParams = {
    Bucket: albumBucketName,
    Body: file,
    Key: `starland/${suffix}`,
  };
  const manageUpload = s3.upload(uploadParams);
  const res = await manageUpload.promise();
  return res;
};

export default uploadAws;
