exports = function(payload) {

  var queryArg = payload.query.arg || '';
  var body = {};
  
  if (payload.body) {
    body = JSON.parse(payload.body.text());
  }
  
  // Get x-signature header and create digest for comparison
  const signature = payload.headers['X-Signature'];
  const digest = utils.crypto.hmac(payload.body.text(), context.values.get("segment_shared_secret"), "sha1", "hex");
  
  //Only write the data if the digest matches Segment's x-signature!
  if (digest == signature) {
    
    let mongodb = context.services.get("mongodb-atlas");
    
    // Set the collection up to write data
    let events = mongodb.db("segment").collection("events");
    
    // Write the data
    events.insertOne(body);
    
  } else  {
    console.log("Digest didn't match");
  }
  
  return queryArg + ' ' + body.msg;
};