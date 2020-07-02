## Pointer Web Server

#### Build SIF

```
sudo singularity build pointer.sif pointer.def
```

#### Expected Instance Run Variables

Here are the essential environment variables needed by the instance

> Note: Singularity passes environment variables to the SIF container by prepending variable names with
> `SINGULARITYENV_`. For example, to set `POINTER_PATH` in the container, you must set
> `SINGULARITYENV_POINTER_PATH`.

##### General

 Variable       | Description
 :------------- |:-------------
SINGULARITYENV_POINTER_PATH | The path to the pointer repo
SINGULARITYENV_POINTER_PORT | The port to run the pointer web server
SINGULARITYENV_BEAGLE_URL | The url to the beagle server


#### Configure singularity mount points

Since we will be running our instance in a singularity container, we need to make sure it has the right paths mounted for it to access the pointer repo.
Running the following command will mount the srv directories and /juno

```
export SINGULARITY_BIND="/srv/services"
```

#### Running an instance

Running the following command will create a pointer instance named `pointer_service`
```
singularity instance start pointer.sif pointer
```

This is accessible through the port number set through `SINGULARITYENV_POINTER_PORT`

For example, if `SINGULARITYENV_POINTER_PORT=4005` on a machine called `silo`:

```
http://silo:4005
```
