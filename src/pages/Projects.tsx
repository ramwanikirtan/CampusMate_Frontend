import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { FolderOpen, Users, Plus, Search, Calendar, GitBranch, Target } from "lucide-react";
import Navigation from "@/components/Navigation";

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [newProject, setNewProject] = useState({ title: "", description: "", category: "", spots: "" });

  const projects = [
    {
      id: 1,
      title: "University Course Management System",
      description: "A comprehensive web application for managing courses, students, and grades using React and Node.js",
      category: "Web Development",
      leader: "Dr. Nagy László",
      leaderRole: "Tutor",
      members: 4,
      maxMembers: 6,
      progress: 65,
      status: "Active",
      deadline: "2024-12-15",
      skills: ["React", "Node.js", "MongoDB", "TypeScript"],
      course: "CS401 - Software Engineering"
    },
    {
      id: 2,
      title: "Machine Learning Stock Predictor",
      description: "Develop a machine learning model to predict stock prices using historical data and market indicators",
      category: "Data Science",
      leader: "Kovács Anna",
      leaderRole: "Student",
      members: 3,
      maxMembers: 5,
      progress: 30,
      status: "Active",
      deadline: "2024-11-30",
      skills: ["Python", "TensorFlow", "Pandas", "Data Analysis"],
      course: "CS305 - Machine Learning"
    },
    {
      id: 3,
      title: "Campus Navigation Mobile App",
      description: "iOS and Android app to help students navigate the university campus with indoor mapping",
      category: "Mobile Development",
      leader: "Szabó Péter",
      leaderRole: "Tutor",
      members: 5,
      maxMembers: 5,
      progress: 85,
      status: "Completed",
      deadline: "2024-10-30",
      skills: ["React Native", "GPS", "UI/UX", "Firebase"],
      course: "CS402 - Mobile Development"
    },
    {
      id: 4,
      title: "Blockchain Voting System",
      description: "Secure and transparent voting system using blockchain technology for student government elections",
      category: "Blockchain",
      leader: "Molnár Katalin",
      leaderRole: "Student",
      members: 2,
      maxMembers: 4,
      progress: 15,
      status: "Recruiting",
      deadline: "2025-01-20",
      skills: ["Solidity", "Web3", "Ethereum", "Smart Contracts"],
      course: "CS450 - Blockchain Technology"
    }
  ];

  const statuses = ["all", "Active", "Recruiting", "Completed"];
  const categories = ["all", "Web Development", "Mobile Development", "Data Science", "Blockchain", "AI/ML"];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = selectedStatus === "all" || project.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSubmitProject = () => {
    console.log("New project:", newProject);
    setNewProject({ title: "", description: "", category: "", spots: "" });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Recruiting": return "bg-green-100 text-green-800 border-green-200";
      case "Completed": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Project Collaboration</h1>
              <p className="text-xl text-muted-foreground">
                Join existing projects or pitch your own ideas
              </p>
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mt-4 md:mt-0 shadow-button">
                  <Plus className="w-4 h-4 mr-2" />
                  Propose Project
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Propose a New Project</DialogTitle>
                  <DialogDescription>
                    Share your project idea with the community
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="Project title..."
                    value={newProject.title}
                    onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                  />
                  <Select
                    value={newProject.category}
                    onValueChange={(value) => setNewProject({...newProject, category: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.filter(cat => cat !== "all").map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Team spots needed..."
                    type="number"
                    value={newProject.spots}
                    onChange={(e) => setNewProject({...newProject, spots: e.target.value})}
                  />
                  <Textarea
                    placeholder="Describe your project idea, goals, and requirements..."
                    value={newProject.description}
                    onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                    rows={4}
                  />
                </div>
                <DialogFooter>
                  <Button onClick={handleSubmitProject}>Submit Proposal</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 p-6 bg-card rounded-lg border shadow-card">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search projects, skills, or descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map(status => (
                  <SelectItem key={status} value={status}>
                    {status === "all" ? "All Status" : status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Project Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredProjects.map(project => (
              <Card key={project.id} className="hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 border border-border">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge className={`text-xs ${getStatusColor(project.status)}`}>
                      {project.status}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {project.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Course info */}
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">{project.course}</span>
                  </div>

                  {/* Progress */}
                  {project.status !== "Recruiting" && (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                  )}

                  {/* Team info */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      <span>{project.members}/{project.maxMembers} members</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>{new Date(project.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Team leader */}
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs">
                        {project.leader.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-sm">
                      <span className="font-medium">{project.leader}</span>
                      <span className="text-muted-foreground"> • {project.leaderRole}</span>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1">
                    {project.skills.map(skill => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  {/* Action button */}
                  <Button 
                    className="w-full" 
                    variant={project.members >= project.maxMembers ? "secondary" : "default"}
                    disabled={project.members >= project.maxMembers}
                  >
                    {project.status === "Recruiting" ? (
                      <>
                        <Target className="w-4 h-4 mr-2" />
                        Join Project
                      </>
                    ) : project.status === "Completed" ? (
                      <>
                        <FolderOpen className="w-4 h-4 mr-2" />
                        View Results
                      </>
                    ) : (
                      <>
                        <GitBranch className="w-4 h-4 mr-2" />
                        {project.members >= project.maxMembers ? "Team Full" : "Request to Join"}
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <FolderOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No projects found</h3>
              <p className="text-muted-foreground">Try adjusting your search or be the first to propose a project</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;