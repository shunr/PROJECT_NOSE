import time
import logger
from os import utime
import firebase_service
import radius_service
import G

users_cache = None
start_time = 0
logger = logger.init("VPN")
        
def restart():
    global users_cache, start_time
    logger.info("Starting VPN service...")
    logger.info("Tick interval: " + str(G.TICK_INTERVAL) + "s")
    users_cache = firebase_service.get_users()
    radius_service.init_users(users_cache)
    start_time = time.time()
    logger.info("Listening for changes...")

def run(users):
    global start_time
    while True:
        elapsed = time.time() - start_time
        logger.info(int(elapsed))
        new_data = firebase_service.get_users()
        if new_data != users:
            logger.info("Updated data!")
            radius_service.init_users(new_data)
            users = list(new_data)
        #if elapsed > G.RESTART_INTERVAL:
        #    break
        #else:
        utime(G.STATUS_FILE, None)
        time.sleep(G.TICK_INTERVAL)

radius_service.init_radius()
restart()
while True:
    try:
        run(users_cache)
    except Exception as e:
        logger.info(e)
        time.sleep(60)
        pass

    

