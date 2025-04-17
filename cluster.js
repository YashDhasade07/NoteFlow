import cluster from 'cluster';
import os from 'os'

if(cluster.isPrimary || cluster.isMaster){
    var cpuCount = os.cpus().length;
    for (let i = 0; i < cpuCount; i++) {
        cluster.fork()  
    } 

    cluster.on('exit', function(){
        cluster.fork()
    })
}else{
    import('./server.js');
}