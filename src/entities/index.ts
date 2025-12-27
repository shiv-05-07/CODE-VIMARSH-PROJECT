/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: events
 * Interface for Events
 */
export interface Events {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  eventName?: string;
  /** @wixFieldType date */
  eventDate?: Date | string;
  /** @wixFieldType time */
  eventTime?: any;
  /** @wixFieldType text */
  eventDescription?: string;
  /** @wixFieldType image */
  eventImage?: string;
  /** @wixFieldType text */
  eventLocation?: string;
  /** @wixFieldType url */
  registrationUrl?: string;
  /** @wixFieldType boolean */
  isUpcoming?: boolean;
}


/**
 * Collection ID: projects
 * Interface for Projects
 */
export interface Projects {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  projectName?: string;
  /** @wixFieldType text */
  shortDescription?: string;
  /** @wixFieldType text */
  fullDescription?: string;
  /** @wixFieldType image */
  projectImage?: string;
  /** @wixFieldType url */
  projectUrl?: string;
  /** @wixFieldType text */
  technologiesUsed?: string;
  /** @wixFieldType text */
  status?: string;
}


/**
 * Collection ID: roadmapmilestones
 * Interface for RoadmapMilestones
 */
export interface RoadmapMilestones {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  status?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType date */
  targetDate?: Date | string;
  /** @wixFieldType date */
  completionDate?: Date | string;
}


/**
 * Collection ID: teammembers
 * Interface for TeamMembers
 */
export interface TeamMembers {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  name?: string;
  /** @wixFieldType text */
  role?: string;
  /** @wixFieldType text */
  bio?: string;
  /** @wixFieldType image */
  profilePicture?: string;
  /** @wixFieldType url */
  linkedInUrl?: string;
}
