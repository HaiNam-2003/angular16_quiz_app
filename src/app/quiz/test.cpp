#include <iostream>
#include <fstream>
#include <chrono>

int main() {
    std::string filePath = "testfile.txt"; // Đường dẫn tập tin bạn muốn sử dụng

    // Tạo tập tin test với nội dung mẫu
    const int fileSize = 1024 * 1024 * 1024; // Kích thước tập tin 100 MB
    char buffer[fileSize];
    std::ofstream outFile(filePath, std::ios::binary);
    outFile.write(buffer, fileSize);
    outFile.close();

    // Đo tốc độ ghi
    auto startWrite = std::chrono::high_resolution_clock::now();
    std::ifstream inFile(filePath, std::ios::binary);
    inFile.read(buffer, fileSize);
    auto endWrite = std::chrono::high_resolution_clock::now();
    inFile.close();

    std::chrono::duration<double> elapsedWrite = endWrite - startWrite;
    std::cout << "Toc do ghi: " << (fileSize / elapsedWrite.count()) / (1024 * 1024) << " MB/s" << std::endl;

    // Đo tốc độ đọc
    auto startRead = std::chrono::high_resolution_clock::now();
    std::ofstream outFile2(filePath, std::ios::binary);
    outFile2.write(buffer, fileSize);
    auto endRead = std::chrono::high_resolution_clock::now();
    outFile2.close();

    std::chrono::duration<double> elapsedRead = endRead - startRead;
    std::cout << "Toc do doc: " << (fileSize / elapsedRead.count()) / (1024 * 1024) << " MB/s" << std::endl;

    // Xóa tập tin test
    remove(filePath.c_str());

    return 0;
}
