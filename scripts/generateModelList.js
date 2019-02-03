var fs = require('fs');
var path = require('path');
var manifest_path = './public/models-zoo-manifest.json'
var repo_version = '0.1.0'
var adapterFor = (function() {
  var url = require('url'),
    adapters = {
      'http:': require('http'),
      'https:': require('https'),
    };

  return function(inputUrl) {
    return adapters[url.parse(inputUrl).protocol]
  }
}());

function convert2Raw(url){
  var repo = url.replace('https://github.com/', '')
  return 'https://' + path.join('raw.githubusercontent.com/', repo, '/master/model-zoo.json');
}
function getModelInfo(url){
  return new Promise((resolve, reject)=>{
    adapterFor(url).get(url, function(resp){
      let data = '';
      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });
      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        try {
          resolve(JSON.parse(data))
        } catch (e) {
          reject(e)
        }
      });
      resp.on('error', (e) => {
        reject(e)
      });
    })
  })
}


function write_manifest(configs){
    console.log("Writing %s configs into '%s'", configs.length, manifest_path);
    var models_manifest =  {}
    if (fs.existsSync(manifest_path)) {
      try {
         models_manifest = JSON.parse(fs.readFileSync(manifest_path));
      } catch (e) {
        console.log('Error occured when reading the old manifest file, please make sure the format is correct or remove the old one. Error: '+e.toString())
      }
    }
    models_manifest.name = models_manifest.name || 'HPA Model Zoo'
    models_manifest.version = repo_version
    models_manifest.models = []

    var keys = {}
    for(var i=0;i<configs.length;i++){
      if(Array.isArray(configs[i])){
        for(var j=0;j<configs[i].length;j++){
          if(!keys[configs[i][j].name]){
            models_manifest.models.push(configs[i][j])
            keys[configs[i][j].name] = true
          }
          else{
            console.error('WARNING: ignore duplicated model: ', configs[i][j].name)
          }
        }
      }
      else{
        if(!keys[configs[i].name]){
          models_manifest.models.push(configs[i])
          keys[configs[i].name] = true
        }
        else{
          console.error('WARNING: ignore duplicated model: ', configs[i].name)
        }
      }
    }

    models_manifest.model_count = models_manifest.models.length

    var stream = fs.createWriteStream(manifest_path);
    stream.once('open', function() {
      stream.write(JSON.stringify(models_manifest,null,' '));
      stream.end();
    });
    console.log("manifest file updated!");
}

fs.readFile('./README.md', 'utf8', function(err, contents) {
    var matches = contents.match(/\((https?:\/\/github.com\S+)\)/gi)
    var urls = []
    var tasks = []
    for(var i=0;i<matches.length;i++){
      var url = matches[i].slice(1, -1);
      urls.push(url);
      url = convert2Raw(url);
      tasks.push(getModelInfo(url))
    }
    Promise.all(tasks).then(function(configs) {
      console.log(configs);
      write_manifest(configs);
    });
});
