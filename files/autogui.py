import time as t
import pyautogui as pg
import KBHIT

#pg.alert(text='Task failed successfully.', title='ok', button='OK')


kb = KBHIT.KBHit()
while True:
	if kb.kbhit():    
		#c = kb.getch()
		#if ord(c) == ord(' '):
			break
	print(pg.position())
#pg.moveTo(500, 500, duration=2)
