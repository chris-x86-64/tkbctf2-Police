#!/usr/bin/env python

import PyV8
import cgi, cgitb
import signal
from contextlib import contextmanager

# check JavaScript
class Global(PyV8.JSClass):
	def isYoshimuraYuu(self):
		print "That was great!! The key is ... \"hatsuneMiku39\""

	def notQuiteDone(self):
		print "You need to set the `proceedable` to true!"

class TimeoutException(Exception):
	pass

@contextmanager
def time_limit(seconds):
	def timeout(signum, frame):
		raise TimeoutException, "Timed out!"
	signal.signal(signal.SIGALRM, timeout)
	signal.alarm(seconds)
	try:
		yield
	finally:
		signal.alarm(0)

def evalJavaScript(post_data):
	try:
		ctxt = PyV8.JSContext(Global())
		ctxt.enter()
		ctxt.eval(open('../public/check.js').read())
		ctxt.eval(open('../private/validator_server.js').read())
		ctxt.eval('checkSum(' + repr(post_data) + ')')
		ctxt.leave()
	except Exception, e:
		print "Perhaps syntax error? Try again!"
# end JavaScript

# CGI
form = cgi.FieldStorage()

print 'Content-type: text/html'
print

try:
	with time_limit(5):
		evalJavaScript(form.getvalue('solution'))
except TimeoutException, msg:
	print "Timed out!"

# end CGI
