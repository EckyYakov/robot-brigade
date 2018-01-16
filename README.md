# Robot-Brigade


Robot-Brigade is a [Brigade](https://github.com/Azure/brigade) Project that utilizes [RFDocker](https://github.com/asyrjasalo/rfdocker) [containers](https://hub.docker.com/r/lachlanevenson/k8s-helm/). 

## Prerequisites

1. Have a running [Kubernetes](https://kubernetes.io/docs/setup/) environment
2. Setup [Helm](https://github.com/kubernetes/helm) - this assumes Helm on your Host regardless of the Helm container used later on. 

## Install

### Set up Brigade

Follow the [quick-start guide](https://github.com/Azure/brigade#quickstart):

Install Brigade into your Kubernetes cluster is to install it using Helm.

```bash
$ helm repo add brigade https://azure.github.io/brigade
$ helm install -n brigade brigade/brigade
```

To manually run Brigade Projects the **brig** binary is required. Follow the
[Developers Guide](https://github.com/Azure/brigade/blob/master/docs/topics/developers.md)
to build the binary. Assuming Brigade is cloned and prerequisites met, simply run:
```bash
$ make brig
```
Test **brig** with `brig version`

### Install HelmBrigade

Clone Robot-Brigade and change directory
```bash
$ git clone https://github.com/EckyYakov/robot-brigade
$ cd robot-brigade
```
Helm install robot-brigade
> note the name and namespace can be customized
```bash
$ helm install --name robot-brigade brigade/brigade-project -f robot-values.yaml
```


## Usage

Manually run the project. The project name is the same as the project value in
the *robot-values.yaml*
```bash
$ brig run -f brigade_robot.js EckyYakov/robot-brigade
```
The project will automatically run all the tests in the test/ directory.

## Notes

If you make changes to *robot-values.yaml* you'll need to redeploy the project.
```bash
$ helm delete robot-brigade --purge
```

## Contribute

PRs accepted.

## License

MIT
