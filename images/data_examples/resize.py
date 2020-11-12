import glob
import cv2
import numpy as np

img_list = sorted(glob.glob("./*.png"))

eximg = cv2.imread(img_list[0])
height, width, _ = eximg.shape
exratio = height * 1.0 / width

for img_path in img_list[1:]:
    print (img_path)
    cur_img = cv2.imread(img_path)
    cur_h, cur_w, _ = cur_img.shape
    cur_ratio = cur_h * 1.0 / cur_w
    if abs(exratio-cur_ratio) < 0.01:
        continue
    else:
        new_h = int(cur_w * exratio)
        new_cur_img = cur_img[:new_h, ...]
        cv2.imwrite(img_path, new_cur_img)










