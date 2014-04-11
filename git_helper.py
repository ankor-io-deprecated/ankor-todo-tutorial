import sys
from subprocess import call as real_call

option_types = {
  'include_complete_branch': ['-ic', '--include-complete']
}

def call(call_args):
  if sys.flags.debug:
    print 'Simulating: ' + ' '.join(call_args)
    return 0
  else:
    return real_call(call_args)

def loop(args, pre_loop, git_command, print_usage):
  if len(args) == 0:
    print_usage()
    exit(0)

  options = filter(filter_options, args)
  branch_args = filter(filter_args, args)

  if len(branch_args) % 3 != 0:
    print_usage()
    print 'Wrong number of arguments!'
    exit(1)

  pre_loop(branch_args, options)

  for i in range(0, len(branch_args), 3):
    branch_base = branch_args[i]
    from_branch = int(branch_args[i + 1])
    to_branch = int(branch_args[i + 2])

    for curr_branch_num in range(from_branch, to_branch + 1):
      curr_branch = branch_base + '-step-' + str(curr_branch_num)

      ret_code = call(['git', 'checkout', curr_branch])
      if ret_code != 0:
        print "Can't checkout target commit '" + curr_branch + "'"
        exit(0)

      git_command(curr_branch, options)

    if check_option(options, 'include_complete_branch'):
      curr_branch = branch_base + '-complete'

      ret_code = call(['git', 'checkout', curr_branch])
      if ret_code != 0:
        print "Can't checkout target commit '" + curr_branch + "'"
        exit(0)

      git_command(curr_branch, options)

  print "Looping complete."

  if sys.flags.debug:
    print 'If you are comfortable with what the script is doing, remove the -d flag.'

def check_option(options, option_type):
  flags = option_types[option_type]

  for flag in flags:
    if flag in options:
      return True

  return False

def filter_options(arg):
  return arg.startswith('-')

def filter_args(arg):
  return not filter_options(arg)
