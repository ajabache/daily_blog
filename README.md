# daily_blog of rjoemar and adrian

todo
 routing using id
 if in id blog then change title of the page




$table->foreign('course_curr_id')->references('curriculum_id')->on('curriculums')
                ->restrictOnDelete()
                ->cascadeOnUpdate();

  2023_03_28_034947_create_courses_table ........................................................................................... 34ms FAIL

   Illuminate\Database\QueryException 

  SQLSTATE[HY000]: General error: 1005 Can't create table `syllabus`.`courses` (errno: 150 "Foreign key constraint is incorrectly formed") (Connection: mysql, SQL: alter table `courses` add constraint `courses_course_curr_id_foreign` foreign key (`course_curr_id`) references `curriculums` (`curriculum_id`) on delete restrict on update cascade)

  at C:\xampp\htdocs\syllabus101\vendor\laravel\framework\src\Illuminate\Database\Connection.php:760
    756▕         // If an exception occurs when attempting to run a query, we'll format the error
    757▕         // message to include the bindings with SQL, which will make this exception a
    758▕         // lot more helpful to the developer instead of just the database's errors.
    759▕         catch (Exception $e) {
  ➜ 760▕             throw new QueryException(
    761▕                 $this->getName(), $query, $this->prepareBindings($bindings), $e
    762▕             );
    763▕         }
    764▕     }

  1   C:\xampp\htdocs\syllabus101\vendor\laravel\framework\src\Illuminate\Database\Connection.php:545
      PDOException::("SQLSTATE[HY000]: General error: 1005 Can't create table `syllabus`.`courses` (errno: 150 "Foreign key constraint is incorrectly formed")")

  2   C:\xampp\htdocs\syllabus101\vendor\laravel\framework\src\Illuminate\Database\Connection.php:545
      PDOStatement::execute()








 
