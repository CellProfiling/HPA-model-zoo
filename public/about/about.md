# About

---

## Model Zoo overview
This model zoo showcases models trained on immunofluorescently stained images from the Human Protein Atlas. The models are able to classify the organelle location of a stained protein in cells.

The first models in the model zoo were the result of an image analysis classification challenge hosted by the Human Protein Atlas at kaggle.com during three months between 2018 and 2019. The goal of the competition, was to develop models capable of classifying mixed patterns of proteins in microscope images.

Proteins are “the doers” in the human cell, executing many functions that together enable life. Historically, classification of proteins has been limited to single patterns in one or a few cell types, but in order to fully understand the complexity of the human cell, models must classify mixed patterns across a range of different human cells.

Images visualizing proteins in cells are commonly used for biomedical research, and these cells could hold the key for the next breakthrough in medicine. However, thanks to advances in high-throughput microscopy, these images are generated at a far greater pace than what can be manually evaluated. Therefore, the need is greater than ever for automating biomedical image analysis to accelerate the understanding of human cells and disease.

---

## Data
The training dataset in the model zoo is comprised of 31072 images. The test set has 11702 images. All image samples are represented by four channels (stored as individual files), the protein of interest (green) plus three cellular landmarks: nucleus (blue), microtubules (red), endoplasmic reticulum (yellow). The green channel is used to predict the label, and the other channels are used as references.

The dataset is acquired in a highly standardized way using one imaging modality (confocal microscopy). However, the dataset comprises 27 different cell types of highly different morphology, which affect the protein patterns of the different organelles.

There are in total 28 different labels present in the dataset. The labels are represented as integers that map to the following:

0. Nucleoplasm  
1. Nuclear membrane   
2. Nucleoli   
3. Nucleoli fibrillar center   
4. Nuclear speckles   
5. Nuclear bodies   
6. Endoplasmic reticulum   
7. Golgi apparatus   
8. Peroxisomes   
9. Endosomes   
10. Lysosomes   
11. Intermediate filaments   
12. Actin filaments   
13. Focal adhesion sites   
14. Microtubules   
15. Microtubule ends   
16. Cytokinetic bridge   
17. Mitotic spindle   
18. Microtubule organizing center   
19. Centrosome   
20. Lipid droplets   
21. Plasma membrane   
22. Cell junctions   
23. Mitochondria   
24. Aggresome   
25. Cytosol   
26. Cytoplasmic bodies   
27. Rods & rings

Multiple labels can be predicted for each sample.

---

## Metric
The models are evaluated based on their [macro F1 score](https://en.wikipedia.org/wiki/F1_score). The macro F1 score is chosen since the models are solving a multi label problem, and each class should be equally important to benefit models that are capable of classifying the broadest range of protein patterns best.
