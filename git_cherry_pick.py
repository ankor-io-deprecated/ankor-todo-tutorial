#!/usr/bin/python

import sys
import git_helper

def print_usage(): 
  print 'Cherry picks a commit to other branches.'
  print ''
  print 'Example: python -d ' + sys.argv[0] + ' master fx 0 8 server 0 9 ios 0 5 --include-complete'
  print ''
  print 'If you are comfortable with what the script is doing, remove the -d flag.'

def check(branch_args, options):
  target_commit = sys.argv[1]

  ret_code = git_helper.call(['git', 'checkout', target_commit])
  if ret_code != 0:
    print "Can't checkout target commit '" + target_commit + "'"
    exit(1)

def cherry_pick(curr_branch, options):
  target_commit = sys.argv[1]

  ret_code = git_helper.call(['git', 'cherry-pick', target_commit])
  if ret_code != 0:
    print "Can't cherry-pick '" + target_commit + "' on top of '" + curr_branch + "'"
    exit(0)

def main():
  git_helper.loop(sys.argv[2:], check, cherry_pick, print_usage)

if __name__ == "__main__":
  main()
