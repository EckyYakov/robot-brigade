# HelmBrigade


HelmBrigade is a [Brigade](https://github.com/Azure/brigade) Project that utilizes  
[Helm](https://github.com/kubernetes/helm) [containers](https://hub.docker.com/r/lachlanevenson/k8s-helm/). 

## Prerequisites

1. Have a running [Kubernetes](https://kubernetes.io/docs/setup/) environment
2. Setup [Helm](https://github.com/kubernetes/helm)

## Install

### Set up Brigade

Follow the [quick-start guide](https://github.com/Azure/brigade#quickstart):

Install Brigade into your Kubernetes cluster is to install it using Helm.

```bash
$ helm repo add brigade https://azure.github.io/brigade
$ helm install -n brigade brigade/brigade
```

**optional** Install Brigade with Ingress
```bash
export FQDN=os.spoc.linux
helm install -n brigade brigade/brigade \
    --set api.service.type=ClusterIP \
    --set ingress.enabled=true \
    --set ingress.hosts={brigade.$FQDN} \
    --dry-run --debug

```

To manually run Brigade Projects the **brig** binary is required. Follow the
[Developers Guide](https://github.com/Azure/brigade/blob/master/docs/topics/developers.md)
to build the binary. Assuming Brigade is cloned and prerequisites met, simply run:
```bash
$ make brig
```
Test **brig** with `brig version`

### Install HelmBrigade

Clone HelmBrigade and change directory
```bash
$ git clone https://github.com/lukepatrick/HelmBrigade
$ cd HelmBrigade
```
Helm install HelmBrigade
> note the name and namespace can be customized
```bash
$ helm install --name helmbrigade brigade/brigade-project -f helmbrigade.yaml
```


## Usage

Manually run the project. The project name is the same as the project value in
the *helmbrigade.yaml*
```bash
$ brig run lukepatrick/HelmBrigade
```


## Contribute

PRs accepted.

## License

MIT