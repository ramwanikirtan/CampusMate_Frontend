import { useState } from "react";
import { useUserRole } from "@/hooks/useUserRole";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Video, FileText, Code, Search, Upload, Users } from "lucide-react";
import Navigation from "@/components/Navigation";

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const { role } = useUserRole();

  const courses = [
    {
      id: 1,
      title: "Data Structures & Algorithms",
      code: "CS301",
      professor: "Dr. Nagy László",
      semester: "Fall 2024",
      subject: "Computer Science",
      students: 156,
      materials: { videos: 24, notes: 18, code: 12 },
      description: "Comprehensive study of fundamental data structures and algorithms with practical implementations."
    },
    {
      id: 2,
      title: "Database Management Systems",
      code: "CS302",
      professor: "Dr. Kovács Anna",
      semester: "Fall 2024",
      subject: "Computer Science",
      students: 134,
      materials: { videos: 20, notes: 15, code: 8 },
      description: "Design and implementation of database systems, SQL, and database theory."
    },
    {
      id: 3,
      title: "Advanced Mathematics",
      code: "MATH201",
      professor: "Dr. Szabó Péter",
      semester: "Fall 2024",
      subject: "Mathematics",
      students: 89,
      materials: { videos: 32, notes: 25, code: 0 },
      description: "Linear algebra, calculus, and mathematical analysis for computer science applications."
    },
    {
      id: 4,
      title: "Software Engineering",
      code: "CS401",
      professor: "Dr. Molnár Katalin",
      semester: "Fall 2024",
      subject: "Computer Science",
      students: 112,
      materials: { videos: 18, notes: 22, code: 15 },
      description: "Software development lifecycle, project management, and engineering best practices."
    }
  ];

  const subjects = ["all", "Computer Science", "Mathematics", "Physics", "Business"];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.professor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === "all" || course.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">Course Materials</h1>
            <p className="text-xl text-muted-foreground">
              Access videos, notes, and resources for all your courses
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 p-6 bg-card rounded-lg border shadow-card">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search courses, codes, or professors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map(subject => (
                  <SelectItem key={subject} value={subject}>
                    {subject === "all" ? "All Subjects" : subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Only tutors/admins can see the upload button */}
            {(role === "tutor" || role === "admin") && (
              <Button className="flex items-center gap-2 shadow-button">
                <Upload className="w-4 h-4" />
                Upload Content
              </Button>
            )}
          </div>

          {/* Course Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map(course => (
              <Card key={course.id} className="hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 border border-border">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {course.code}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {course.subject}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {course.professor} • {course.semester}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {course.description}
                  </p>
                  
                  {/* Student count */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{course.students} students enrolled</span>
                  </div>

                  {/* Materials */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex items-center gap-1 text-sm">
                      <Video className="w-4 h-4 text-primary" />
                      <span>{course.materials.videos}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <FileText className="w-4 h-4 text-primary" />
                      <span>{course.materials.notes}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Code className="w-4 h-4 text-primary" />
                      <span>{course.materials.code}</span>
                    </div>
                  </div>

                  <Button className="w-full" variant="outline">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Access Materials
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No courses found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;