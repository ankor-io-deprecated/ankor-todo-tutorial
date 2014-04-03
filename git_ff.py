#!/usr/bin/python

import sys
from subprocess import call as real_call

def print_usage(): 
  print 'Fast-forwards multiple branches.'
  print ''
  print 'Example: python -d ' + sys.argv[0] + ' fx 0 8 server 0 9 ios 0 5 --include-complete'
  print ''
  print 'If you are comfortable with what the script is doing, remove the -d flag.'

option_types = {
  'include_complete_branch': ['-ic', '--include-complete']
}

def main():
  args = sys.argv[1:]

  if len(args) == 0:
    print_usage()
    exit(0)

  options = extract_options(args)

  limit = len(args) - len(options)
  args_without_options = args[:limit]
  branch_args = args_without_options[0:]

  if len(branch_args) % 3 != 0:
    print_usage()
    print 'Wrong number of arguments!'
    exit(1)

  for i in range(0, len(branch_args), 3):
    branch_base = branch_args[i]
    from_branch = int(branch_args[i + 1])
    to_branch = int(branch_args[i + 2])

    for curr_branch_num in range(from_branch, to_branch + 1):
      curr_branch = branch_base + '-step-' + str(curr_branch_num)
      pull(curr_branch)

    if check_option(options, 'include_complete_branch'):
      curr_branch = branch_base + '-complete'
      pull(curr_branch)

  print "Pulling complete."

  if sys.flags.debug:
    print 'If you are comfortable with what the script is doing, remove the -d flag.'

def pull(curr_branch):
  ret_code = call(['git', 'checkout', curr_branch])
  if ret_code != 0:
    print "Can't checkout commit '" + curr_branch + "'"
    exit(0)

  ret_code = call(['git', 'pull', '--ff-only'])
  if ret_code != 0:
      print "Can't pull '" + curr_branch + "'"
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
