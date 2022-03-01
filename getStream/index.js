const {
  IvsClient,
  GetChannelCommand
} = require('@aws-sdk/client-ivs');

exports.handler = async (event) => {

  const ivsClient = new IvsClient({
    region: 'us-east-1',
    credentials: {
      accessKeyId: process.env.AWS_IVS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_IVS_SECRET_ACCESS_KEY,
    }
  });

  return ivsClient.send(new GetChannelCommand({
    arn: process.env.AWS_IVS_DRONELIVESTREAM_ARN
  })).then((getChannelResponse) => {
    console.log(getChannelResponse);

    return {
      statusCode: 200,
      body: JSON.stringify({
        playbackUrl: getChannelResponse.channel.playbackUrl,
        streamRtmp: process.env.RESTREAM_RTMP
      }),
    };

  }, (getChannelError) => {
    console.log('getChannelError', getChannelError);

    return {
      statusCode: 500,
      body: JSON.stringify(getChannelError),
    };
  });
};
