import re

def validate_pin_code(pin_code):
    pattern = r'^[1-9][0-9]{5}$'
    regex = re.compile(pattern)
    if regex.match(pin_code):
        return True
    else:
        return False

