This dataset includes annotated cell images obtained from the Human Protein Atlas (http://www.proteinatlas.org), each image contains 4 channels (Microtubules, ER, Nuclei and Protein of Interest). The cells in each image are annotated with polygons and saved into GeoJSON format produced with Kaibu(https://kaibu.org) annotation tool.

 * hpa_cell_segmentation_dataset_v2_512x512_4train_159test.zip is an example dataset for running a deep learning-based interactive annotation tools in ImJoy (https://github.com/imjoy-team/imjoy-interactive-segmentation).
 * hpa_dataset_v2.zip is a full annotate image segmentation dataset


Utility functions in Python for reading the GeoJSON annotation can be found here: https://github.com/imjoy-team/kaibu-utils/blob/main/kaibu_utils/__init__.py
