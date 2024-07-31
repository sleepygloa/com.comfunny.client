import numpy as np
from locData import data


# Get maximum x and y values to determine the matrix size
max_x = max(int(item["std_loc_x"]) for item in data)
max_y = max(int(item["std_loc_y"]) for item in data)

# Create a matrix filled with zeros
matrix = np.zeros((max_x, max_y), dtype=int)

# Populate the matrix with 1s based on the data
for item in data:
    x = int(item["std_loc_x"]) - 1
    y = int(item["std_loc_y"]) - 1
    matrix[x, y] = 1

# Convert the matrix to a text string
matrix_str = "\n".join("".join(str(cell) for cell in row) for row in matrix)

# Output the text string
print(matrix_str)