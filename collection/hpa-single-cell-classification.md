## Training dataset for the Human Protein Atlas - Single Cell Classification competition 2021

More information: https://www.kaggle.com/competitions/hpa-single-cell-image-classification/data


## What files do I need?
On the data page below, you will find a set of full size original images (a mix of 1728x1728, 2048x2048 and 3072x3072 PNG files) in train.zip and test.zip. (Please note that since this is a code competition, part of test data will be hidden)

You will also need the image level labels from train.csv and the filenames for the test set from sample_submission.csv. As many Kagglers made use of all public images in HPA for previous classification challenge, we made the public HPA images available to download as instructed in this notebook. Note also that there are TFRecords available if competitors would like to use TPUs.

The 16-bit version of the training images are available here. Additional training images are available here.

## What should I expect the data format to be?
The training image-level labels are provided for each sample in train.csv. The bulk of the data for images - train.zip. Each sample consists of four files. Each file represents a different filter on the subcellular protein patterns represented by the sample. The format should be [filename]_[filter color].png for the PNG files. Colors are red for microtubule channels, blue for nuclei channels, yellow for Endoplasmic Reticulum (ER) channels, and green for protein of interest.

## What am I predicting?
You are predicting protein organelle localization labels for each cell in the image. Border cells are included when there is enough information to decide on the labels.

There are in total 19 different labels present in the dataset (18 labels for specific locations, and label 18 for negative and unspecific signal). The dataset is acquired in a highly standardized way using one imaging modality (confocal microscopy). However, the dataset comprises 17 different cell types of highly different morphology, which affect the protein patterns of the different organelles. All image samples are represented by four filters (stored as individual files), the protein of interest (green) plus three cellular landmarks: nucleus (blue), microtubules (red), endoplasmic reticulum (yellow). The green filter should hence be used to predict the label, and the other filters are used as references. The labels are represented as integers that map to the following:

```
  0. Nucleoplasm
  1. Nuclear membrane
  2. Nucleoli
  3. Nucleoli fibrillar center
  4. Nuclear speckles
  5. Nuclear bodies
  6. Endoplasmic reticulum
  7. Golgi apparatus
  8. Intermediate filaments
  9. Actin filaments
  10. Microtubules
  11. Mitotic spindle
  12. Centrosome
  13. Plasma membrane
  14. Mitochondria
  15. Aggresome
  16. Cytosol
  17. Vesicles and punctate cytosolic patterns
  18. Negative
```

## What is meant by weak image-level labels?
The labels you will get for training are image level labels while the task is to predict cell level labels. That is to say, each training image contains a number of cells that have collectively been labeled as described above and the prediction task is to look at images of the same type and predict the labels of each individual cell within those images.

As the training labels are a collective label for all the cells in an image, it means that each labeled pattern can be seen in the image but not necessarily that each cell within the image expresses the pattern. This imprecise labeling is what we refer to as weak.

During the challenge you will both need to segment the cells in the images and predict the labels of those segmented cells.

Files:
 - train - training images (in .tif)
 - test - test images (in .png) - the task of the competition is to segment and label the images in this folder
 - train.csv - filenames and image level labels for the training set
 - sample_submission.csv - filenames for the test set, and a guide to constructing a working submission.

Columns:
 - ID - The base filename of the sample. As noted above all samples consist of four files - blue, green, red, and yellow.
 - Label - in the training data, this represents the labels assigned to each sample; in submission, this represent the labels assigned to each cell.
