#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
 
#define charMaxSize 256
 
int main(void) {
	FILE *fpRead, *fpWrite;
	char fpReadName[] = "OriginalData.txt";
    char fpWriteName[] = "EditData.txt";
	char strRead[charMaxSize], strObject[8], strSubIndex[8], strSize[8], strData[16];
 
	fpRead = fopen(fpReadName, "r");
	if(fpRead == NULL) {
		printf("%s file not open!\n", fpReadName);
		return -1;
	}

    fpWrite = fopen(fpWriteName, "w");
	if(fpWrite == NULL) {
		printf("%s file not open!\n", fpWriteName);
		return -1;
	}
 
	while(fgets(strRead, charMaxSize, fpRead) != NULL) {
        strncpy(strObject, strRead, 5);
        strncpy(strSubIndex, strRead + 5, 5);
        strncpy(strSize, strRead + 10, 5);
        strncpy(strData, strRead + 15, 9);
        fprintf(fpWrite, "%s\n%s\n%s\n%s\n\n\n\n\n", strObject, strSubIndex, strSize, strData);
	}
 
	fclose(fpRead);
    fclose(fpWrite);
 
	return 0;
}