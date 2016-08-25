from os import remove
from subprocess import call
import G

users_path = "/etc/freeradius/mods-config/files/authorize"

def reload_radius():
    call(["service", "freeradius", "reload"])

def init_users(users):
    global users_path
    remove(users_path)
    f = open(users_path, 'w+')
    for user in users:
        write_user(f, user)
    f.close()
    reload_radius()

def write_user(f, user):
    print(user["user"]
          + " Cleartext-Password := '"
          + user["pass"]
          + "'"
          + " #" + user["id"], file=f)   
   
    
            
   
