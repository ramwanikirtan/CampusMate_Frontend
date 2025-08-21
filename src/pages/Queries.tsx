import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, ThumbsUp, ThumbsDown, Plus, Search, CheckCircle, Clock, MessageCircle } from "lucide-react";
import Navigation from "@/components/Navigation";

const Queries = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [newQuery, setNewQuery] = useState({ title: "", content: "", category: "" });

  const queries = [
    {
      id: 1,
      title: "How to implement binary search tree deletion?",
      content: "I'm struggling with implementing the delete operation for a binary search tree. Can someone explain the different cases?",
      category: "Data Structures",
      author: "Kovács János",
      authorRole: "Student",
      timestamp: "2 hours ago",
      upvotes: 12,
      downvotes: 1,
      responses: 5,
      solved: false,
      tags: ["BST", "Algorithms", "CS301"]
    },
    {
      id: 2,
      title: "Database normalization question",
      content: "What's the difference between 2NF and 3NF? I have a table that I think needs normalization but I'm not sure which form to apply.",
      category: "Database",
      author: "Nagy Petra",
      authorRole: "Student", 
      timestamp: "4 hours ago",
      upvotes: 8,
      downvotes: 0,
      responses: 3,
      solved: true,
      tags: ["SQL", "Normalization", "CS302"]
    },
    {
      id: 3,
      title: "Project collaboration tools recommendations",
      content: "Our team is working on a software engineering project. What are the best tools for version control and project management?",
      category: "General",
      author: "Dr. Molnár Katalin",
      authorRole: "Tutor",
      timestamp: "1 day ago",
      upvotes: 15,
      downvotes: 0,
      responses: 8,
      solved: false,
      tags: ["Tools", "Collaboration", "CS401"]
    },
    {
      id: 4,
      title: "Linear algebra matrix operations",
      content: "I need help understanding eigenvalues and eigenvectors. How do they relate to linear transformations?",
      category: "Mathematics",
      author: "Szabó Andrea",
      authorRole: "Student",
      timestamp: "2 days ago",
      upvotes: 6,
      downvotes: 1,
      responses: 4,
      solved: true,
      tags: ["Linear Algebra", "MATH201"]
    }
  ];

  const categories = ["all", "Data Structures", "Database", "Mathematics", "General", "Programming"];

  const filteredQueries = queries.filter(query => {
    const matchesSearch = query.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         query.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         query.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || query.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSubmitQuery = () => {
    // Handle query submission logic here
    console.log("New query:", newQuery);
    setNewQuery({ title: "", content: "", category: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Discussion Board</h1>
              <p className="text-xl text-muted-foreground">
                Ask questions and get help from the community
              </p>
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mt-4 md:mt-0 shadow-button">
                  <Plus className="w-4 h-4 mr-2" />
                  Ask Question
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Ask a Question</DialogTitle>
                  <DialogDescription>
                    Post your question to get help from tutors and fellow students
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="Question title..."
                    value={newQuery.title}
                    onChange={(e) => setNewQuery({...newQuery, title: e.target.value})}
                  />
                  <Select
                    value={newQuery.category}
                    onValueChange={(value) => setNewQuery({...newQuery, category: value})}
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
                  <Textarea
                    placeholder="Describe your question in detail..."
                    value={newQuery.content}
                    onChange={(e) => setNewQuery({...newQuery, content: e.target.value})}
                    rows={4}
                  />
                </div>
                <DialogFooter>
                  <Button onClick={handleSubmitQuery}>Post Question</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 p-6 bg-card rounded-lg border shadow-card">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search questions, content, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Query List */}
          <div className="space-y-6">
            {filteredQueries.map(query => (
              <Card key={query.id} className="hover:shadow-elegant transition-all duration-300 border border-border">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {query.category}
                        </Badge>
                        {query.solved && (
                          <Badge className="text-xs bg-green-100 text-green-800 border-green-200">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Solved
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg hover:text-primary cursor-pointer transition-colors">
                        {query.title}
                      </CardTitle>
                      <CardDescription className="mt-2">
                        {query.content}
                      </CardDescription>
                    </div>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {query.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-xs">
                            {query.author.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-sm">
                          <span className="font-medium">{query.author}</span>
                          <span className="text-muted-foreground"> • {query.authorRole}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{query.timestamp}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          {query.upvotes}
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <ThumbsDown className="w-4 h-4 mr-1" />
                          {query.downvotes}
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MessageCircle className="w-4 h-4" />
                        <span>{query.responses} responses</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredQueries.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No questions found</h3>
              <p className="text-muted-foreground">Try adjusting your search or be the first to ask a question</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Queries;