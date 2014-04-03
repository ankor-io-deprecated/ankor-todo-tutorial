#!/usr/bin/python

import sys
from subprocess import call

"""
def call(call_arguments):
  print 'Executing: ' + ' '.join(call_arguments)
  return 0
"""

def print_usage(): 
  print 'Cherry picks a commit and copies it to a list of branches'
  print 'Example: python ' + sys.argv[0] + ' 268de3c fx 0 7 server 0 8'

args = sys.argv[1:]

if len(args[1:]) % 3 != 0:
  print_usage()
  print 'Wrong number of arguments!'
  exit(1)

target_commit = args[0]
ret_code = call(['git', 'checkout', target_commit])

if ret_code != 0:
  print "Can't checkout target commit '" + target_commit + "'"
  exit(1)

for i in range(1, len(args), 3):
  branch_base = args[i]
  from_branch = int(args[i + 1])
  to_branch = int(args[i + 2])

  for curr_branch_num in range(from_branch, to_branch):
    curr_branch = branch_base + '-step-' + str(curr_branch_num)

    ret_code = call(['git', 'checkout', curr_branch])
    if ret_code != 0:
      print "Can't checkout target commit '" + curr_branch + "'"
      exit(0)

    ret_code = call(['git', 'cherry-pick', target_commit])
    if ret_code != 0:
      print "Can't cherry-pick '" + target_commit + "' on top of '" + curr_branch + "'"
      exit(0)
