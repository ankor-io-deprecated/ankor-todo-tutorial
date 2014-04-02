//
//  ToDoListView.m
//  TodoList
//
//  Created by Thomas Spiegl on 27/11/13.
//  Copyright (c) 2013 Thomas Spiegl. All rights reserved.
//

#import "ToDoListView.h"
#import "AddToDoItemViewController.h"
#import "ANKRefs.h"

@interface ToDoListView ()

@property NSMutableArray *toDoItems;

@end

@implementation ToDoListView

- (void)viewDidLoad
{
    [super viewDidLoad];
    self.toDoItems = [[NSMutableArray alloc] init];
    
    // Uncomment Option 1 or 2

    // Option 1: Register observer using selector
    [ANKRefs observe:@"root.model.tasks" target:self listener:@selector(tasksChanged:)];

    // Option 2: Register observer using Block
    //[ANKRefs observe:@"root.model.tasks" listener:^(id value) {
    //    [[self toDoItems]removeAllObjects];
    //    [[self toDoItems]addObjectsFromArray:value];
    //    [self.tableView reloadData];
    //}];
}

// The tasksChanged will be called whenever there is a change to the tasks property
// within the model (see viewDidLoad for listener registration via @selector)
- (void)tasksChanged:(id) value {
    [[self toDoItems]removeAllObjects];
    [[self toDoItems]addObjectsFromArray:value];
    [self.tableView reloadData];
}

- (IBAction)unwindToList:(UIStoryboardSegue *)segue
{
    AddToDoItemViewController *source = [segue sourceViewController];
    NSDictionary* params = source.toDoItem;
    if (params != nil) {
        // Uncomment this line
        //[ANKRefs fireAction:@"root.model" name:@"newTask" params:params];
    }
}

- (IBAction)removeClicked:(id)sender {
    // Uncomment this line
    //[ANKRefs fireAction:@"root.model" name:@"clearTasks"];
}

- (id)initWithStyle:(UITableViewStyle)style
{
    self = [super initWithStyle:style];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

#pragma mark - Table view delegate

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    [tableView deselectRowAtIndexPath:indexPath animated:NO];
    NSDictionary* tappedItem = [self.toDoItems objectAtIndex:indexPath.row];
    
    NSString* path = [NSString stringWithFormat:@"root.model.tasks[%d].completed", (int)indexPath.row];
    NSNumber* completed;
    if ([[tappedItem objectForKey:@"completed"] intValue] == 0) {
        completed = [NSNumber numberWithBool:YES];
    } else {
        completed = [NSNumber numberWithBool:NO];
    }
    // Uncomment this line
    //[ANKRefs changeValue:path value:completed];
    [self.tableView reloadData];
}

#pragma mark - Table view data source

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView
{
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    return [self.toDoItems count];
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    static NSString *CellIdentifier = @"ListPrototypeCell";
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:CellIdentifier forIndexPath:indexPath];
    NSDictionary *toDoItem = [self.toDoItems objectAtIndex:indexPath.row];
    cell.textLabel.text = [toDoItem objectForKey:@"title"];
    BOOL completed = [[toDoItem objectForKey:@"completed"] intValue] == 1;
    if (completed) {
        cell.accessoryType = UITableViewCellAccessoryCheckmark;
    } else {
        cell.accessoryType = UITableViewCellAccessoryNone;
    }
    return cell;
}

/*
// Override to support conditional editing of the table view.
- (BOOL)tableView:(UITableView *)tableView canEditRowAtIndexPath:(NSIndexPath *)indexPath
{
    // Return NO if you do not want the specified item to be editable.
    return YES;
}
*/

/*
// Override to support editing the table view.
- (void)tableView:(UITableView *)tableView commitEditingStyle:(UITableViewCellEditingStyle)editingStyle forRowAtIndexPath:(NSIndexPath *)indexPath
{
    if (editingStyle == UITableViewCellEditingStyleDelete) {
        // Delete the row from the data source
        [tableView deleteRowsAtIndexPaths:@[indexPath] withRowAnimation:UITableViewRowAnimationFade];
    }   
    else if (editingStyle == UITableViewCellEditingStyleInsert) {
        // Create a new instance of the appropriate class, insert it into the array, and add a new row to the table view
    }   
}
*/

/*
// Override to support rearranging the table view.
- (void)tableView:(UITableView *)tableView moveRowAtIndexPath:(NSIndexPath *)fromIndexPath toIndexPath:(NSIndexPath *)toIndexPath
{
}
*/

/*
// Override to support conditional rearranging of the table view.
- (BOOL)tableView:(UITableView *)tableView canMoveRowAtIndexPath:(NSIndexPath *)indexPath
{
    // Return NO if you do not want the item to be re-orderable.
    return YES;
}
*/

/*
#pragma mark - Navigation

// In a story board-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender
{
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}

 */

@end
