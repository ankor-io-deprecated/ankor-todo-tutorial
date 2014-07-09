#!/usr/bin/python

import sys
import git_helper

def print_usage(): 
  print 'Rebases all local changes for multiple branches.'
  print ''
  print 'Example: python -d ' + sys.argv[0] + ' fx 0 7 server 0 8 ios 0 4 js 0 6 --include-complete'
  print ''
  print 'If you are comfortable with what the script is doing, remove the -d flag.'

def check(branch_args, options):
  pass

def rebase(curr_branch, options):
  ret_code = git_helper.call(['git', 'rebase'])
  if ret_code != 0:
      print "Can't pull '" + curr_branch + "'"
      exit(0)

def main():
  git_helper.loop(sys.argv[1:], check, rebase, print_usage)

if __name__ == "__main__":
  main()
