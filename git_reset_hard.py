#!/usr/bin/python

import sys
import git_helper

def print_usage(): 
  print 'Resets a range of branches to the origin version.'
  print ''
  print 'Example: python -d ' + sys.argv[0] + ' fx 0 8 server 0 9 ios 0 5 --include-complete'
  print ''
  print 'If you are comfortable with what the script is doing, remove the -d flag.'

def check(branch_args, options):
  pass

def fast_forward(curr_branch, options):
  ret_code = git_helper.call(['git', 'reset', '--hard', 'origin/'+curr_branch])
  if ret_code != 0:
      print "Can't fast forward '" + curr_branch + "'"
      exit(0)

def main():
  git_helper.loop(sys.argv[1:], check, fast_forward, print_usage)

if __name__ == "__main__":
  main()
