const HELM_VERSION = "v2.5.1"
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

const IMAGE_VERSION = "0.1.0"
const IMAGE = "quay.io/larryrensing/robot:" + IMAGE_VERSION

const CONTAINER = "lachlanevenson/k8s-helm:" + HELM_VERSION

const { events, Job } = require("brigadier")
const util = require('util')

events.on("exec", (e, p) => {

  // env info
  console.log("==> Project " + p.name + " clones the repo at " + p.repo.cloneURL)
  console.log("==> Event " + e.type + " caused by " + e.provider)

  // create job with name and container image to use
  var helm_job = new Job("robot-job", IMAGE) // runs helm_job 
  helm_job.storage.enabled = false
  
  // allow docker socket
  helm_job.docker.enabled = true

  //set up tasks
  helm_job.tasks = [] //init empty tasks
 
  //set environment vars
  helm_job.env = {
    "HOST_UID": p.users.uid,
    "HOST_GID": p.users.gid
  }
  
  //Tasks
  helm_job.tasks.push("echo Running robot test suite")  
  
  helm_job.tasks.push("${@:-tests}")

  //set up ENV
  // helm_job.env = helm_job.env = {
  //   "HELM_HOST": ""
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


events.on("error", (e) => {
    console.log("Error event " + util.inspect(e, false, null) )
    console.log("==> Event " + e.type + " caused by " + e.provider + " cause class" + e.cause + e.cause.reason)
})

events.on("after", (e) => {  
    console.log("After event fired " + util.inspect(e, false, null) )
})
