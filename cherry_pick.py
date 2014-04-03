#!/usr/bin/python

import sys
from subprocess import call as real_call

def print_usage(): 
  print 'Cherry picks a commit to other branches.'
  print ''
  print 'Example: python -d ' + sys.argv[0] + ' --include-complete master fx 0 7 server 0 8'
  print ''
  print 'If you are comfortable with what the script would to, remove the -d flag.'

option_types = {
  'include_complete_branch': ['-ic', '--include-complete']
}

def main():
  args = sys.argv[1:]

  if len(args) == 0:
    print_usage()
    exit(0)

  options = extract_options(args)

  args_without_options = args[len(options):]
  target_commit = args_without_options[0]
  branch_args = args_without_options[1:]

  if len(branch_args) % 3 != 0:
    print_usage()
    print 'Wrong number of arguments!'
    exit(1)

  ret_code = call(['git', 'checkout', target_commit])
  if ret_code != 0:
    print "Can't checkout target commit '" + target_commit + "'"
    exit(1)

  for i in range(0, len(branch_args), 3):
    branch_base = branch_args[i]
    from_branch = int(branch_args[i + 1])
    to_branch = int(branch_args[i + 2])

    for curr_branch_num in range(from_branch, to_branch + 1):
      curr_branch = branch_base + '-step-' + str(curr_branch_num)
      cherry_pick(curr_branch, target_commit)

    if check_option(options, 'include_complete_branch'):
      curr_branch = branch_base + '-complete'
      cherry_pick(curr_branch, target_commit)

  print "Cherry picking complete."

def cherry_pick(curr_branch, target_commit):
  ret_code = call(['git', 'checkout', curr_branch])
  if ret_code != 0:
    print "Can't checkout target commit '" + curr_branch + "'"
    exit(0)

  ret_code = call(['git', 'cherry-pick', target_commit])
  if ret_code != 0:
    print "Can't cherry-pick '" + target_commit + "' on top of '" + curr_branch + "'"
    exit(0)

def call(call_args):
  if sys.flags.debug:
    print 'Simulating: ' + ' '.join(call_args)
    return 0
  else:
    return real_call(call_args)

def check_option(options, option_type):
  flags = option_types[option_type]

  for flag in flags:
    if flag in options:
      return True

  return False

def extract_options(args):
  options = []
  for arg in args:
    if arg.startswith('-'):
      options.append(arg)
  return options

if __name__ == "__main__":
    main()
