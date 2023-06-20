import os

for i in range(1, 31):
    folder_name = "day-" + str(i)
    if not os.path.exists(folder_name):
        os.makedirs(folder_name)
