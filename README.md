# HPA-Model-Zoo

A collection of deep learning models for analyzing the Human Protein Atlas images.

## Models

* [HPA-model-template](https://github.com/CellProfiling/HPA-model-template)
* [HPA-model-example](https://github.com/oeway/HPA-model-example)
* [HPA-model-bestfitting](https://github.com/CellProfiling/HPA-competition-solutions/tree/master/bestfitting)
* [HPA-model-WAIR](https://github.com/CellProfiling/HPA-competition-solutions/tree/master/wair)
* [HPA-model-pudae](https://github.com/CellProfiling/pudae-kaggle-hpa)
* [HPA-model-wienerschnitzelgemeinschaft](https://github.com/CellProfiling/HPA-competition-solutions/tree/master/wienerschnitzelgemeinschaft)
* [HPA-model-vpp](https://github.com/CellProfiling/HPA-competition-solutions/tree/master/vpp)
* [HPA-model-One More Layer](https://github.com/CellProfiling/HPA-competition-solutions/tree/master/one_more_layer_of_stacking)
* [HPA-model-conv is all you need](https://github.com/CellProfiling/HPA-competition-solutions/tree/master/conv_is_all_you_need)
* [HPA-model-NTU_MiRA](https://github.com/CellProfiling/HPA-competition-solutions/tree/master/ntu_mira)
* [HPA-model-Random Walk](https://github.com/CellProfiling/HPA-competition-solutions/tree/master/random_walk)

## Development

The model zoo is built using [Vue.js](https://vuejs.org/). Make sure you have [`node`](https://nodejs.org/en/) installed.

### Install

1. Clone this repo to a folder.

    ```sh
    git clone git@github.com:CellProfiling/HPA-model-zoo.git
    cd HPA-model-zoo
    ```

2. Run `npm install` in the folder to install the dependencies
3. Run `npm run serve` to start a dev server which supports hot reloading when you edit the files. Go and see it through `http://localhost:8000/#/`.
4. For vue-material UI elements, you can find those [here](https://vuematerial.io/).
5. When you have made the changes, commit in a new branch and make a pull request to our GitHub repository targeting the master branch.
6. When the pull request is merged to master branch, netlify will automatically build and publish the new version of the site at `https://modelzoo.cellprofiling.org/`.
