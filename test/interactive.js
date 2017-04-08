var demo_list = {}

demo_list.fib = {
  bytecodes: [16, 44, 0, 0, 0, 102, 0, 105, 0, 98, 0, 32, 0, 51, 0, 48, 0, 32, 0, 111, 0, 102, 0, 32, 0, 112, 0, 101, 0, 110, 0, 99, 0, 105, 0, 108, 0, 98, 0, 111, 0, 120, 0, 3, 0, 33, 40, 0, 0, 0, 1, 21, 0, 3, 2, 47, 43, 12, 0, 0, 0, 21, 0, 7, 19, 0, 0, 0, 20, 32, 0, 21, 0, 3, 1, 37, 34, 2, 32, 0, 21, 0, 3, 2, 37, 34, 2, 36, 18, 19, 31, 1, 3, 0, 32, 0, 3, 30, 34, 2, 35, 2, 17],
  env: 'return {}'
}

demo_list.nest_func = {
  bytecodes: [16, 14, 0, 0, 0, 101, 0, 113, 0, 58, 0, 32, 0, 3, 0, 33, 26, 0, 0, 0, 2, 33, 8, 0, 0, 0, 2, 21, 0, 21, 1, 36, 18, 19, 31, 21, 2, 21, 0, 21, 1, 34, 3, 17, 18, 19, 31, 1, 3, 0, 3, 9, 32, 0, 3, 3, 3, 6, 34, 3, 44, 35, 2, 17],
  env: 'return {}'
}

demo_list.plotting = {
  bytecodes: [16, 210, 5, 0, 0, 49, 0, 52, 0, 112, 0, 120, 0, 32, 0, 72, 0, 101, 0, 108, 0, 118, 0, 97, 0, 116, 0, 105, 0, 99, 0, 97, 0, 44, 0, 32, 0, 65, 0, 114, 0, 105, 0, 97, 0, 108, 0, 3, 0, 101, 0, 120, 0, 99, 0, 108, 0, 117, 0, 115, 0, 105, 0, 111, 0, 110, 0, 3, 0, 114, 0, 111, 0, 117, 0, 110, 0, 100, 0, 3, 0, 109, 0, 105, 0, 116, 0, 101, 0, 114, 0, 3, 0, 98, 0, 108, 0, 97, 0, 99, 0, 107, 0, 3, 0, 99, 0, 101, 0, 110, 0, 116, 0, 101, 0, 114, 0, 3, 0, 98, 0, 111, 0, 116, 0, 116, 0, 111, 0, 109, 0, 3, 0, 114, 0, 103, 0, 98, 0, 97, 0, 40, 0, 50, 0, 51, 0, 53, 0, 44, 0, 55, 0, 50, 0, 44, 0, 50, 0, 51, 0, 44, 0, 49, 0, 41, 0, 3, 0, 114, 0, 103, 0, 98, 0, 97, 0, 40, 0, 49, 0, 55, 0, 50, 0, 44, 0, 52, 0, 48, 0, 44, 0, 52, 0, 54, 0, 44, 0, 49, 0, 41, 0, 3, 0, 114, 0, 103, 0, 98, 0, 97, 0, 40, 0, 50, 0, 50, 0, 56, 0, 44, 0, 50, 0, 48, 0, 51, 0, 44, 0, 49, 0, 52, 0, 57, 0, 44, 0, 49, 0, 41, 0, 3, 0, 114, 0, 103, 0, 98, 0, 97, 0, 40, 0, 50, 0, 52, 0, 56, 0, 44, 0, 50, 0, 52, 0, 44, 0, 51, 0, 56, 0, 44, 0, 49, 0, 41, 0, 3, 0, 114, 0, 103, 0, 98, 0, 97, 0, 40, 0, 57, 0, 54, 0, 44, 0, 57, 0, 50, 0, 44, 0, 49, 0, 50, 0, 57, 0, 44, 0, 49, 0, 41, 0, 3, 0, 99, 0, 114, 0, 101, 0, 97, 0, 116, 0, 101, 0, 73, 0, 109, 0, 97, 0, 103, 0, 101, 0, 68, 0, 97, 0, 116, 0, 97, 0, 3, 0, 114, 0, 103, 0, 98, 0, 97, 0, 40, 0, 49, 0, 53, 0, 57, 0, 44, 0, 50, 0, 50, 0, 54, 0, 44, 0, 49, 0, 51, 0, 54, 0, 44, 0, 49, 0, 41, 0, 3, 0, 114, 0, 103, 0, 98, 0, 97, 0, 40, 0, 57, 0, 57, 0, 44, 0, 49, 0, 55, 0, 53, 0, 44, 0, 57, 0, 50, 0, 44, 0, 49, 0, 41, 0, 3, 0, 103, 0, 101, 0, 116, 0, 73, 0, 109, 0, 97, 0, 103, 0, 101, 0, 68, 0, 97, 0, 116, 0, 97, 0, 3, 0, 112, 0, 97, 0, 116, 0, 116, 0, 101, 0, 114, 0, 110, 0, 95, 0, 105, 0, 109, 0, 103, 0, 3, 0, 114, 0, 101, 0, 112, 0, 101, 0, 97, 0, 116, 0, 3, 0, 114, 0, 103, 0, 98, 0, 97, 0, 40, 0, 49, 0, 54, 0, 51, 0, 44, 0, 49, 0, 49, 0, 56, 0, 44, 0, 49, 0, 55, 0, 56, 0, 44, 0, 49, 0, 41, 0, 3, 0, 114, 0, 103, 0, 98, 0, 97, 0, 40, 0, 49, 0, 57, 0, 53, 0, 44, 0, 54, 0, 44, 0, 50, 0, 51, 0, 50, 0, 44, 0, 49, 0, 41, 0, 3, 0, 114, 0, 103, 0, 98, 0, 97, 0, 40, 0, 54, 0, 52, 0, 44, 0, 49, 0, 52, 0, 53, 0, 44, 0, 50, 0, 48, 0, 44, 0, 49, 0, 41, 0, 3, 0, 114, 0, 103, 0, 98, 0, 97, 0, 40, 0, 56, 0, 53, 0, 44, 0, 49, 0, 53, 0, 56, 0, 44, 0, 49, 0, 52, 0, 48, 0, 44, 0, 49, 0, 41, 0, 3, 0, 114, 0, 103, 0, 98, 0, 97, 0, 40, 0, 50, 0, 52, 0, 50, 0, 44, 0, 49, 0, 48, 0, 57, 0, 44, 0, 54, 0, 53, 0, 44, 0, 49, 0, 41, 0, 3, 0, 102, 0, 105, 0, 108, 0, 108, 0, 84, 0, 101, 0, 120, 0, 116, 0, 107, 88, 69, 81, 135, 101, 44, 103, 3, 0, 198, 48, 173, 48, 185, 48, 200, 48, 146, 48, 101, 81, 155, 82, 87, 48, 126, 48, 89, 48, 3, 0, 114, 0, 103, 0, 98, 0, 97, 0, 40, 0, 49, 0, 48, 0, 48, 0, 44, 0, 57, 0, 55, 0, 44, 0, 49, 0, 44, 0, 49, 0, 41, 0, 3, 0, 114, 0, 103, 0, 98, 0, 97, 0, 40, 0, 54, 0, 53, 0, 44, 0, 50, 0, 50, 0, 55, 0, 44, 0, 55, 0, 50, 0, 44, 0, 49, 0, 41, 0, 3, 0, 114, 0, 103, 0, 98, 0, 97, 0, 40, 0, 50, 0, 44, 0, 49, 0, 48, 0, 56, 0, 44, 0, 49, 0, 54, 0, 49, 0, 44, 0, 49, 0, 41, 0, 3, 0, 114, 0, 103, 0, 98, 0, 97, 0, 40, 0, 50, 0, 52, 0, 51, 0, 44, 0, 49, 0, 57, 0, 51, 0, 44, 0, 49, 0, 52, 0, 53, 0, 44, 0, 49, 0, 41, 0, 3, 0, 52, 0, 48, 0, 44, 0, 49, 0, 53, 0, 48, 0, 32, 0, 3, 0, 52, 0, 48, 0, 44, 0, 48, 0, 32, 0, 3, 0, 114, 0, 103, 0, 98, 0, 97, 0, 40, 0, 49, 0, 53, 0, 51, 0, 44, 0, 50, 0, 48, 0, 48, 0, 44, 0, 53, 0, 49, 0, 44, 0, 49, 0, 41, 0, 3, 0, 114, 0, 103, 0, 98, 0, 97, 0, 40, 0, 50, 0, 50, 0, 44, 0, 50, 0, 48, 0, 49, 0, 44, 0, 49, 0, 50, 0, 54, 0, 44, 0, 49, 0, 41, 0, 3, 0, 49, 0, 52, 0, 48, 0, 44, 0, 49, 0, 48, 0, 48, 0, 32, 0, 3, 0, 49, 0, 52, 0, 48, 0, 44, 0, 49, 0, 52, 0, 48, 0, 32, 0, 3, 0, 114, 0, 103, 0, 98, 0, 97, 0, 40, 0, 49, 0, 54, 0, 57, 0, 44, 0, 49, 0, 53, 0, 53, 0, 44, 0, 50, 0, 50, 0, 49, 0, 44, 0, 49, 0, 41, 0, 3, 0, 97, 0, 98, 0, 99, 0, 100, 0, 101, 0, 102, 0, 103, 0, 3, 0, 114, 0, 103, 0, 98, 0, 97, 0, 40, 0, 49, 0, 51, 0, 54, 0, 44, 0, 49, 0, 49, 0, 50, 0, 44, 0, 49, 0, 49, 0, 44, 0, 49, 0, 41, 0, 3, 0, 114, 0, 103, 0, 98, 0, 97, 0, 40, 0, 55, 0, 52, 0, 44, 0, 52, 0, 44, 0, 56, 0, 57, 0, 44, 0, 49, 0, 41, 0, 3, 0, 114, 0, 103, 0, 98, 0, 97, 0, 40, 0, 49, 0, 57, 0, 50, 0, 44, 0, 57, 0, 48, 0, 44, 0, 50, 0, 51, 0, 57, 0, 44, 0, 49, 0, 41, 0, 3, 0, 114, 0, 103, 0, 98, 0, 97, 0, 40, 0, 49, 0, 51, 0, 55, 0, 44, 0, 49, 0, 49, 0, 53, 0, 44, 0, 49, 0, 55, 0, 50, 0, 44, 0, 49, 0, 41, 0, 3, 0, 114, 0, 103, 0, 98, 0, 97, 0, 40, 0, 57, 0, 53, 0, 44, 0, 49, 0, 56, 0, 53, 0, 44, 0, 49, 0, 54, 0, 51, 0, 44, 0, 49, 0, 41, 0, 3, 0, 114, 0, 103, 0, 98, 0, 97, 0, 40, 0, 49, 0, 53, 0, 53, 0, 44, 0, 49, 0, 55, 0, 53, 0, 44, 0, 56, 0, 52, 0, 44, 0, 49, 0, 41, 0, 3, 0, 108, 0, 101, 0, 102, 0, 116, 0, 3, 0, 98, 0, 114, 0, 97, 0, 110, 0, 99, 0, 104, 0, 32, 0, 49, 0, 32, 0, 102, 0, 97, 0, 108, 0, 115, 0, 101, 0, 3, 0, 98, 0, 114, 0, 97, 0, 110, 0, 99, 0, 104, 0, 32, 0, 49, 0, 32, 0, 116, 0, 114, 0, 117, 0, 101, 0, 3, 0, 98, 0, 114, 0, 97, 0, 110, 0, 99, 0, 104, 0, 32, 0, 50, 0, 32, 0, 116, 0, 114, 0, 117, 0, 101, 0, 3, 0, 98, 0, 114, 0, 97, 0, 110, 0, 99, 0, 104, 0, 32, 0, 50, 0, 32, 0, 102, 0, 97, 0, 108, 0, 115, 0, 101, 0, 3, 0, 98, 0, 114, 0, 97, 0, 110, 0, 99, 0, 104, 0, 32, 0, 51, 0, 32, 0, 102, 0, 97, 0, 108, 0, 115, 0, 101, 0, 3, 0, 98, 0, 114, 0, 97, 0, 110, 0, 99, 0, 104, 0, 32, 0, 51, 0, 32, 0, 116, 0, 114, 0, 117, 0, 101, 0, 3, 0, 120, 0, 3, 0, 50, 0, 3, 0, 53, 0, 3, 0, 49, 0, 3, 0, 55, 0, 35, 1, 1, 3, 0, 57, 1, 8, 205, 204, 76, 63, 58, 1, 1, 3, 1, 59, 1, 1, 3, 2, 60, 1, 3, 3, 61, 1, 1, 3, 3, 62, 1, 3, 2, 64, 1, 1, 3, 4, 66, 1, 3, 5, 65, 1, 3, 3, 67, 1, 3, 3, 68, 1, 1, 3, 5, 70, 1, 1, 3, 6, 71, 1, 74, 0, 3, 0, 3, 0, 3, 50, 3, 50, 98, 4, 3, 25, 3, 25, 3, 25, 3, 0, 8, 228, 203, 150, 64, 72, 5, 78, 0, 1, 3, 7, 69, 1, 105, 0, 74, 0, 3, 50, 3, 0, 3, 100, 3, 100, 98, 4, 3, 50, 3, 0, 3, 100, 3, 32, 3, 23, 73, 5, 78, 0, 1, 3, 8, 69, 1, 105, 0, 74, 0, 3, 150, 3, 0, 3, 100, 3, 100, 98, 4, 3, 150, 3, 0, 95, 2, 3, 250, 3, 100, 93, 2, 78, 0, 1, 3, 9, 69, 1, 105, 0, 74, 0, 3, 250, 3, 0, 3, 100, 3, 100, 98, 4, 78, 0, 1, 3, 10, 69, 1, 105, 0, 74, 0, 5, 44, 1, 3, 50, 3, 100, 3, 100, 98, 4, 3, 200, 2, 206, 3, 100, 3, 100, 98, 4, 78, 0, 101, 0, 77, 0, 1, 3, 11, 56, 1, 3, 250, 3, 0, 3, 100, 3, 100, 87, 4, 99, 0, 1, 3, 12, 3, 100, 3, 100, 79, 2, 42, 2, 5, 94, 1, 3, 0, 5, 194, 1, 3, 150, 80, 4, 31, 32, 0, 3, 0, 1, 3, 13, 81, 3, 32, 0, 3, 1, 1, 3, 14, 81, 3, 32, 0, 56, 1, 5, 94, 1, 3, 0, 3, 100, 3, 100, 87, 4, 17, 5, 134, 1, 3, 40, 3, 20, 3, 20, 76, 4, 1, 3, 15, 3, 0, 3, 0, 5, 232, 3, 5, 244, 1, 89, 4, 42, 2, 1, 3, 16, 41, 1, 1, 3, 17, 82, 2, 56, 1, 5, 194, 1, 3, 0, 3, 100, 3, 100, 87, 4, 5, 88, 2, 3, 50, 3, 100, 5, 88, 2, 3, 50, 3, 0, 83, 6, 31, 32, 0, 3, 0, 1, 3, 18, 81, 3, 32, 0, 3, 1, 1, 3, 19, 81, 3, 32, 0, 56, 1, 5, 38, 2, 3, 0, 3, 100, 3, 100, 87, 4, 17, 1, 3, 16, 41, 1, 3, 0, 3, 0, 3, 100, 3, 100, 5, 138, 2, 3, 0, 3, 100, 3, 100, 84, 9, 1, 3, 16, 41, 1, 5, 188, 2, 3, 0, 3, 50, 3, 50, 84, 5, 74, 0, 5, 238, 2, 3, 0, 3, 100, 3, 100, 98, 4, 78, 0, 1, 3, 20, 69, 1, 105, 0, 74, 0, 5, 32, 3, 3, 50, 3, 25, 3, 50, 8, 219, 15, 73, 63, 3, 0, 8, 219, 15, 201, 64, 85, 7, 78, 0, 105, 0, 74, 0, 5, 82, 3, 3, 0, 3, 100, 3, 100, 98, 4, 78, 0, 1, 3, 21, 56, 1, 86, 0, 1, 3, 22, 56, 1, 1, 3, 23, 5, 82, 3, 3, 40, 88, 3, 1, 3, 24, 5, 82, 3, 3, 60, 88, 3, 3, 200, 3, 200, 109, 2, 3, 20, 63, 1, 74, 0, 3, 20, 3, 20, 95, 2, 3, 80, 3, 20, 93, 2, 78, 0, 1, 3, 25, 69, 1, 105, 0, 74, 0, 3, 20, 3, 20, 95, 2, 3, 80, 3, 80, 93, 2, 3, 20, 3, 80, 93, 2, 78, 0, 1, 3, 26, 69, 1, 105, 0, 3, 1, 63, 1, 4, 56, 255, 4, 56, 255, 109, 2, 3, 5, 3, 5, 103, 2, 90, 0, 35, 1, 74, 0, 3, 0, 3, 100, 3, 100, 3, 100, 98, 4, 78, 0, 1, 3, 27, 69, 1, 105, 0, 1, 3, 28, 56, 1, 1, 3, 29, 3, 40, 3, 150, 91, 2, 36, 3, 10, 3, 160, 88, 3, 1, 3, 30, 3, 40, 3, 0, 91, 2, 36, 3, 10, 3, 140, 88, 3, 74, 0, 3, 100, 3, 100, 3, 100, 3, 100, 98, 4, 78, 0, 1, 3, 31, 69, 1, 105, 0, 1, 3, 32, 56, 1, 1, 3, 33, 3, 140, 3, 100, 92, 2, 36, 3, 110, 3, 160, 88, 3, 1, 3, 34, 3, 140, 3, 140, 92, 2, 36, 3, 110, 3, 140, 88, 3, 1, 3, 35, 56, 1, 1, 3, 36, 3, 210, 3, 150, 88, 3, 74, 0, 3, 200, 3, 100, 3, 100, 3, 100, 98, 4, 3, 210, 3, 140, 1, 3, 36, 94, 1, 3, 15, 98, 4, 78, 0, 1, 3, 37, 69, 1, 105, 0, 1, 3, 15, 41, 1, 5, 44, 1, 3, 100, 96, 3, 74, 0, 5, 238, 2, 3, 100, 3, 100, 3, 100, 98, 4, 5, 32, 3, 3, 150, 5, 82, 3, 3, 150, 97, 4, 78, 0, 1, 3, 38, 69, 1, 105, 0, 74, 0, 5, 82, 3, 3, 100, 3, 100, 3, 100, 98, 4, 78, 0, 1, 3, 39, 69, 1, 105, 0, 8, 53, 250, 142, 188, 100, 1, 74, 0, 5, 82, 3, 3, 100, 3, 100, 3, 100, 98, 4, 78, 0, 1, 3, 40, 69, 1, 105, 0, 3, 0, 100, 1, 3, 1, 8, 205, 204, 204, 61, 8, 205, 204, 204, 189, 3, 1, 3, 0, 3, 200, 104, 6, 1, 3, 41, 69, 1, 3, 0, 3, 0, 3, 100, 3, 100, 106, 4, 3, 1, 3, 0, 3, 0, 3, 1, 3, 0, 3, 0, 104, 6, 3, 100, 3, 200, 109, 2, 1, 3, 42, 69, 1, 3, 0, 3, 0, 3, 100, 3, 100, 106, 4, 3, 0, 3, 150, 109, 2, 1, 3, 4, 56, 1, 1, 3, 43, 70, 1, 3, 0, 3, 5, 3, 10, 3, 15, 3, 20, 3, 25, 3, 30, 3, 35, 3, 40, 49, 9, 31, 3, 8, 3, 3, 3, 5, 36, 44, 32, 0, 51, 1, 3, 0, 88, 3, 3, 7, 3, 56, 3, 49, 37, 44, 32, 0, 51, 1, 3, 0, 88, 3, 3, 6, 3, 2, 3, 3, 39, 44, 32, 0, 51, 1, 3, 0, 88, 3, 3, 4, 3, 28, 3, 7, 38, 44, 32, 0, 51, 1, 3, 0, 88, 3, 3, 3, 3, 7, 3, 4, 40, 44, 32, 0, 51, 1, 3, 0, 88, 3, 3, 3, 3, 7, 3, 4, 40, 44, 32, 0, 51, 1, 3, 0, 88, 3, 1, 3, 44, 3, 8, 3, 9, 44, 43, 13, 0, 0, 0, 1, 3, 45, 7, 3, 0, 0, 0, 20, 1, 3, 44, 44, 32, 0, 51, 1, 3, 0, 88, 3, 1, 3, 46, 3, 8, 3, 8, 44, 43, 13, 0, 0, 0, 1, 3, 46, 7, 3, 0, 0, 0, 20, 1, 3, 47, 44, 32, 0, 51, 1, 3, 0, 88, 3, 1, 3, 48, 3, 8, 3, 7, 44, 43, 13, 0, 0, 0, 1, 3, 49, 7, 3, 0, 0, 0, 20, 1, 3, 48, 44, 32, 0, 51, 1, 3, 0, 88, 3, 17, 3, 45, 3, 50, 3, 55, 3, 60, 3, 65, 3, 70, 3, 75, 3, 80, 3, 85, 3, 90, 3, 95, 3, 100, 3, 105, 3, 110, 3, 115, 3, 120, 3, 125, 3, 130, 3, 135, 3, 140, 3, 145, 49, 21, 31, 3, 1, 3, 1, 44, 32, 0, 51, 1, 3, 0, 88, 3, 1, 3, 50, 1, 3, 50, 44, 32, 0, 51, 1, 3, 0, 88, 3, 3, 0, 3, 2, 1, 3, 51, 44, 44, 32, 0, 51, 1, 3, 0, 88, 3, 3, 2, 3, 1, 45, 32, 0, 51, 1, 3, 0, 88, 3, 1, 3, 51, 3, 1, 45, 32, 0, 51, 1, 3, 0, 88, 3, 3, 0, 3, 1, 3, 1, 45, 44, 32, 0, 51, 1, 3, 0, 88, 3, 3, 0, 3, 1, 3, 2, 45, 44, 32, 0, 51, 1, 3, 0, 88, 3, 3, 2, 3, 1, 46, 32, 0, 51, 1, 3, 0, 88, 3, 3, 1, 3, 1, 46, 32, 0, 51, 1, 3, 0, 88, 3, 3, 0, 3, 1, 3, 2, 46, 44, 32, 0, 51, 1, 3, 0, 88, 3, 3, 1, 3, 2, 47, 32, 0, 51, 1, 3, 0, 88, 3, 3, 1, 1, 3, 52, 47, 32, 0, 51, 1, 3, 0, 88, 3, 3, 0, 3, 2, 3, 2, 47, 44, 32, 0, 51, 1, 3, 0, 88, 3, 3, 1, 3, 2, 48, 32, 0, 51, 1, 3, 0, 88, 3, 3, 1, 1, 3, 53, 48, 32, 0, 51, 1, 3, 0, 88, 3, 3, 0, 3, 3, 3, 2, 48, 44, 32, 0, 51, 1, 3, 0, 88, 3, 17, 3, 200, 3, 205, 3, 210, 3, 215, 3, 220, 3, 225, 3, 230, 3, 235, 3, 240, 49, 9, 31, 3, 240, 32, 0, 51, 1, 44, 32, 0, 51, 1, 3, 0, 88, 3, 3, 205, 32, 0, 3, 1, 50, 2, 44, 32, 0, 51, 1, 3, 0, 88, 3, 3, 200, 32, 0, 53, 1, 44, 32, 0, 51, 1, 3, 0, 88, 3, 32, 0, 5, 232, 3, 52, 2, 5, 232, 3, 32, 0, 51, 1, 44, 32, 0, 51, 1, 3, 0, 88, 3, 32, 0, 5, 232, 3, 54, 2, 5, 232, 3, 32, 0, 53, 1, 44, 32, 0, 51, 1, 3, 0, 88, 3, 17],
  env: `
    const env = {}
    const img = new Image()
    img.src = 'https://mdn.mozillademos.org/files/222/Canvas_createpattern.png'
    env.pattern_img = img
    return env
  `
}

var loadDemo = function(key){
  if (key in demo_list) {
    input.value = demo_list[key].bytecodes
    env_input.value = demo_list[key].env
  }
}

var Stringify = function(val){
  var cache = []

  return JSON.stringify(val, function(key, value){
    if (typeof value === 'object' && value !== null) {
      if (cache.indexOf(value) > -1) {
        return "[loop ref] -> " + value.toString()

      } else {
        cache.push(value)
      }
    }

    if (value instanceof Function)
      return value.toString()

    if (value instanceof ImageData)
      return value.toString()

    return value
  }, 4)
}