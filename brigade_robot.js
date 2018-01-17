const IMAGE_VERSION = "3.0.2"
const IMAGE = "quay.io/charter-ctec/rfdocker:" + IMAGE_VERSION

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
  
  //Tasks
  //Run the tests in the test directory
  helm_job.tasks.push("echo Running robot test suite...")  
  helm_job.tasks.push("robot /src/tests")

  console.log("==> Set up tasks, env, Job ")
  //debug only
  console.log(helm_job)

  console.log("==> Running helm_job Job")

  // run Start Job, get Promise and print results
  helm_job.run().then( resultStart => {
    //debug only
    /*console.log("==> Start Job Results")
    console.log(resultStart.toString())
    console.log("==> Start Job Done")
    console.log("==> Running Push Job")*/
    })
})


events.on("error", (e) => {
    console.log("Error event " + util.inspect(e, false, null) )
    console.log("==> Event " + e.type + " caused by " + e.provider + " cause class" + e.cause + e.cause.reason)
})

events.on("after", (e) => {  
    console.log("After event fired " + util.inspect(e, false, null) )
})
