const HELM_VERSION = "2.5.1"
  /* 
    v2.7.2, latest
    v2.6.1,
    v2.5.1,
    v2.4.2,
    v2.3.1, 
    v2.2.3,
    v2.1.3, 
    v2.0.2
  */

const CONTAINER = "lachlanevenson/k8s-helm:" + HELM_VERSION

const { events, Job } = require("brigadier")

events.on("exec", (e, p) => {

  // env info
  console.log("==> Project " + p.name + " clones the repo at " + p.repo.cloneURL)
  console.log("==> Event " + e.type + " caused by " + e.provider)

  // create job with name and container image to use
  var helm_job = new Job("helm-job", CONTAINER) // runs helm_job 
  
  // allow docker socket
  helm_job.docker.enabled = true

  //set up tasks
  helm_job.tasks = [] //init empty tasks
 

  helm_job.tasks.push("ls /src") // add first task
  helm_job.tasks.push("helm ls") 
  helm_job.tasks.push("helm repo list") 


  //set up ENV
  // helm_job.env = helm_job.env = {
  //   "KOLLA_BASE": "ubuntu",
  //   "KOLLA_TYPE": "source",
  //   "KOLLA_TAG": "4.0.2-kb",
  //   "KOLLA_PROJECT": "keystone",
  //   "KOLLA_NAMESPACE": "charter-os",
  //   "KOLLA_VERSION": KOLLA_VERSION,
  //   "DOCKER_USER": p.secrets.docker_user,
  //   "DOCKER_PASS": p.secrets.docker_pass,
  //   "DOCKER_REGISTRY": "quay.io",
  //   "REPO_BASE": "https://github.com/openstack",
  //   "PROJECT_REFERENCE": "stable/ocata",
  //   "PROJECT_GIT_COMMIT": "e1a94f39edb6cf777c71c7a511476b1e60436ab9",
  //   "RELEASE": "stable-ocata"
  // }


  console.log("==> Set up tasks, env, Job ")
  //debug only
  //console.log(helm_job)

  console.log("==> Running helm_job Job")

  // run Start Job, get Promise and print results
  helm_job.run().then( resultStart => {
    //debug only
    console.log("==> Start Job Results")
    console.log(resultStart.toString())
    console.log("==> Start Job Done")
    console.log("==> Running Push Job")
  })

})