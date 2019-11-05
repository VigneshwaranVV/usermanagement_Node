var routeList = [];
function print (path, layer) {

  if (layer.route) {
    layer.route.stack.forEach(print.bind(null, path.concat(split(layer.route.path))))
  } else if (layer.name === 'router' && layer.handle.stack) {
    layer.handle.stack.forEach(print.bind(null, path.concat(split(layer.regexp))))
  } else if (layer.method) {
    let type = layer.method.toUpperCase();
    if (routeList.filter(route => (route.type == typeVal(type) && 
                                route.path == path.concat(split(layer.regexp)).filter(Boolean).join('/'))).length === 0){
    routeList.push({"method": String("   " + layer.method.toUpperCase()).slice(-6),
                    "type": typeVal(type),
                    "path": path.concat(split(layer.regexp)).filter(Boolean).join('/')
                  });
    }
  }
}

function typeVal(type){
  return type === "GET" ? 0 : type === "POST" ? 1 : type === "PATCH" ? 2 : type === "DELETE" ? 3 : 4 ;
}

function split (thing) {
  if (typeof thing === 'string') {
    return thing.split('/')
  } else if (thing.fast_slash) {
    return ''
  } else {
    var match = thing.toString()
      .replace('\\/?', '')
      .replace('(?=\\/|$)', '$')
      .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//)
    return match
      ? match[1].replace(/\\(.)/g, '$1').split('/')
      : '<complex:' + thing.toString() + '>'
  }
}

module.exports.printRoutes = function(app){
  console.log("Printing Unique Routes");
  app._router.stack.forEach(print.bind(null, []));
  routeList.sort((a,b) => (a.path < b.path) ? -1 : ((a.path > b.path) ? 1 : (a.type < b.type) ? -1 : ((a.type > b.type) ? 1 : 0 ))); 
  routeList.forEach(function(route){ 
            console.log(route.method + " " + route.path); 
  });
}
