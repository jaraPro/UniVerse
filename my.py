from pybricks.hubs import EV3Brick
from pybricks.ev3devices import ColorSensor
from pybricks.parameters import Port, Color
from pybricks.tools import wait

ev3 = EV3Brick()
color_sensor = ColorSensor(Port.S3)

while True:
    if color_sensor.color() == Color.YELLOW:
        ev3.speaker.say("Yellow")
        wait(2000)