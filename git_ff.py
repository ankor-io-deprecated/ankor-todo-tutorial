#!/usr/bin/python

import sys
import git_helper

def print_usage(): 
  print 'Fast-forwards multiple branches.'
  print ''
  print 'Example: python -d ' + sys.argv[0] + ' fx 0 7 server 0 8 ios 0 4 js 0 6 --include-complete'
  print ''
  print 'If you are comfortable with what the script is doing, remove the -d flag.'

def check(branch_args, options):
  pass

def fast_forward(curr_branch, options):
  ret_code = git_helper.call(['git', 'pull', '--ff-only'])
  if ret_code != 0:
      print "Can't fast forward '" + curr_branch + "'"
      exit(0)

def main():
  print "fetching..."
  ret_code = git_helper.call(['git', 'fetch'])
  if ret_code != 0:
      print "Can't fetch"
      exit(0)
  git_helper.loop(sys.argv[1:], check, fast_forward, print_usage)

if __name__ == "__main__":
  main()
