const {
  IvsClient,
  StopStreamCommand
} = require('@aws-sdk/client-ivs');

exports.handler = async (event) => {

  const ivsClient = new IvsClient({
    region: 'us-east-1',
    credentials: {
      accessKeyId: process.env.AWS_IVS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_IVS_SECRET_ACCESS_KEY,
    }
  });

  return ivsClient.send(new StopStreamCommand({
    channelArn: process.env.AWS_IVS_DRONELIVESTREAM_ARN
  })).then((stopStreamResponse) => {
    console.log(stopStreamResponse);

    return {
      statusCode: 200,
      body: JSON.stringify({}),
    };

  }, (stopStreamError) => {
    console.log('stopStreamError', stopStreamError);

    return {
      statusCode: 500,
      body: JSON.stringify(stopStreamError),
    };
  });
};
