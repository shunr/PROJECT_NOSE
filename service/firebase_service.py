import pyrebase
import G

firebase = pyrebase.initialize_app(G.FIREBASE_CONFIG)
db = firebase.database()

def get_users():
    global db
    usersRef = db.child("users")
    users = []
    for user in usersRef.get().each():
        obj = user.val()
        if validate_user(obj):
            users.append({"id": user.key(), "user": obj[G.CREDENTIALS_KEY][G.USER_KEY], "pass": obj[G.CREDENTIALS_KEY][G.PASS_KEY]})                                                             
    return users

def validate_user(user):
    login = user.get(G.CREDENTIALS_KEY)
    is_disabled = user.get(G.DISABLED_KEY)
    if login and G.USER_KEY in login and G.PASS_KEY in login and not is_disabled:
        return True
    else:
        return False
