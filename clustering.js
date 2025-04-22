import cluster from 'cluster';
import os from 'os'

if(cluster.isPrimary){
    let cpus = os.cpus().length;
    for(let i =0; i< cpus; i++){
        cluster.fork()
    }

    cluster.on('exit' , ()=> cluster.fork())
}else{
    import('./server.js')
}


