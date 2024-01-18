#include <stdio.h>
#include <stdint.h>
#include <graphics.h>
#include <math.h>

typedef struct point{
	double x,y,z;
}Point;

void drawlines(Point cube2D[]){
	for(int i=0;i<=3;i++){
		 	if(!(cube2D[i+4].x > cube2D[0].x && cube2D[i+4].y > cube2D[0].y && cube2D[i+4].x < cube2D[2].x && cube2D[i+4].y < cube2D[2].y)){
				if(!(cube2D[((i+1)%4)+4].x > cube2D[0].x && cube2D[((i+1)%4)+4].y > cube2D[0].y && cube2D[((i+1)%4)+4].x < cube2D[2].x && cube2D[((i+1)%4)+4].y < cube2D[2].y)){
			line(cube2D[i+4].x,cube2D[i+4].y,cube2D[((i+1)%4)+4].x,cube2D[((i+1)%4)+4].y);}
			line(cube2D[i].x,cube2D[i].y,cube2D[i+4].x,cube2D[i+4].y);
			}
			line(cube2D[i].x,cube2D[i].y,cube2D[(i+1)%4].x,cube2D[(i+1)%4].y);
	}
}

int keyupdate(Point* camera,Point* vec){
	char input;
	if(kbhit()){
		input=getch();
		switch(input){
			case 'a':
			vec->x -= 4;break;
			case 'd':
			vec->x += 4;break;
			case 's':
			vec->y += 4;break;
			case 'w':
			vec->y -= 4;break;
			case 'e':
			vec->x = 0;
			vec->y = 0;break;
			case 'q':
			return 1;
			break;
		}
	}
}	

void movecube(Point cube[],Point* vec){
	for(int i=0;i<8;i++){
		cube[i].x += vec->x;	
		cube[i].y += vec->y;	
		cube[i].z += vec->z;	
	}
	for(int i=0;i<8;i++){
		if(vec->x > 5)vec->x = 5;
		if(vec->x < -5)vec->x = -5;
		if(vec->y > 5)vec->y = 5;
		if(vec->y < -5)vec->y = -5;
		if(vec->z > 10)vec->z = 50;
	}
	//vec->x = 0;vec->y = 0; vec->z = 0;
}

int collision(Point cube[],Point* vec,int xres,int yres){
	for(int i=0;i<4;i++){
		if(cube[i].x<=0 || cube[i].x>=xres){
			vec->x *= -1;
			return 1;
		}
		if(cube[i].y<=0||cube[i].y>=yres){
			vec->y *= -1;
			return 1;
		}
	}
	return 0;
}

int main(){
	int xres = 1366,yres = 738;
	initwindow(xres,yres);
	Point cube2D[8];
	Point cube3D[8];
	Point cube[8]=	{{100,100,0},
			{100,200,0},
			{200,200,0},
			{200,100,0},
			{100,100,100},
			{100,200,100},
			{200,200,100},
			{200,100,100}};
				
	int i=0;
	Point vec = {2,2,0};
	Point camera = {xres/2,yres/2,-600};
	Point Roll_A = {xres/2,yres/2,0};
	Point Roll_B = {170,170,0};
	Point Roll_C = {170,170,0};

	for(int j =0;j<8;j++){
		cube3D[j].x = cube[j].x;
		cube3D[j].y = cube[j].y;
		cube3D[j].z = cube[j].z;
	}
	
	while(1){setactivepage(i%2);cleardevice();

	if(keyupdate(&camera,&vec)==1)return 0;
	if(collision(cube3D,&vec,xres,yres)==1){movecube(cube3D,&vec);movecube(cube3D,&vec);}
	movecube(cube3D,&vec);
	/*for(int j =0;j<8;j++){
		cube3D[j].x = Roll_A.x + (cube[j].x-Roll_A.x)*cos(i%361*(3.14/180.0))+(cube[j].y-Roll_A.y)*sin(i%361*(3.14/180.0));
		cube3D[j].y = Roll_A.y + (cube[j].y-Roll_A.y)*cos(i%361*(3.14/180.0))-(cube[j].x-Roll_A.x)*sin(i%361*(3.14/180.0));
		cube3D[j].z = cube[j].z;
	}*/
	for(int j =0;j<8;j++){
		cube2D[j].x = camera.x + (camera.x-cube3D[j].x) * camera.z/(cube3D[j].z-camera.z);
		cube2D[j].y = camera.y + (camera.y-cube3D[j].y) * camera.z/(cube3D[j].z-camera.z);
	}
	drawlines(cube2D);
	putpixel(xres/2,yres/2,YELLOW);

	setvisualpage(i%2);i++;delay(10);}
}
