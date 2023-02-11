# pygame.locals

pygame定数

This module contains various constants used by pygame. Its contents are automatically placed in the pygame module namespace. However, an application can use pygame.locals to include only the pygame constants with a from pygame.locals import *.

Detailed descriptions of the various constants can be found throughout the pygame documentation. Here are the locations of some of them.

The pygame.displaypygame module to control the display window and screen module contains flags like FULLSCREEN used by pygame.display.set_mode()Initialize a window or screen for display.
The pygame.eventpygame module for interacting with events and queues module contains the various event types.
The pygame.keypygame module to work with the keyboard module lists the keyboard constants and modifiers (K_* and MOD_*) relating to the key and mod attributes of the KEYDOWN and KEYUP events.
The pygame.timepygame module for monitoring time module defines TIMER_RESOLUTION.