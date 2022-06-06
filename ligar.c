#include <stdio.h>
#include <stdlib.h>

int main(){

    char tecla;
    system("node index");
    printf("Pressione enter para sair...\n");
    scanf("%c",&tecla);
    system("^C");
    return 0;
}