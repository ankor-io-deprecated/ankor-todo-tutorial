## Necessary steps for updating the tutorial for new Ankor release version:

### Example: Switching server tutorial to version "0.2.0":

1. Switch to master:

    > $ git checkout master

2. Update (fast-forward) all step branches (just to be sure):

    > $ python git_ff.py server 0 9 -ic

3. Switch to step 0:

    > $ git checkout server-step-0

4. Change version in pom.xml:

    > ...
    >  <ankor.version>0.2.0</ankor.version>
    > ...

5. Change version in javadoc links:

    > java
    > [2]: http://ankor.io/static/javadoc/apidocs-0.2/at/irian/ankor/ref/Ref.html

6. Commit the change:

    > $ git commit

7. Remember the commit hash:

    > $ git log
    >
    >     ...
    >     commit **a9c085737571e07f7f0be738c6791f309a91737c**
    >     Author: John Doe <john.doe@irian.at>
    >     Date:   Thu Apr 3 21:58:40 2014 +0200
    >         switched ankor.version in pom to 0.2.0

8. Switch back to master

    > $ git checkout master

9. Cherry-pick to other steps:

    > python cherry_pick.py a9c085737571e07f7f0be738c6791f309a91737c server 1 8 -ic

10. Push to github:

    > $ git push --all
